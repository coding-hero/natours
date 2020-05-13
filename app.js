const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

// 1) MIDDLEWARES
app.use(express.static(path.resolve(__dirname, 'public'))); // Serve static files

app.use(helmet()); // Set secure headers

// Limit requests from the same IP to protect against attacks ( brute force !)
const limiter = rateLimit({
  max: 100, // Max api request
  windowMs: 60 * 60 * 1000, // Per one hour,
  message: {
    status: 'fail',
    message: 'Too many requests from the this IP. Please try again in an hour!'
  }
});
app.use('/api', limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Development logger
}
// Body parser, reading data from body into req.body (limited to 10kb)
app.use(express.json({ limit: '10kb' }));
// Cookie parser, parse the cookie that browser sends
app.use(cookieParser());
// Form parser, reading data from form into req.body
// Only when we need to respond to form actions !
app.use(express.urlencoded({ extended: true, limit: '1kb' }));

// Data sanitization against NoSql query injections
app.use(mongoSanitize());
// Data sanitization against XSS ( Cross-site scripting attack !)
app.use(xss());

// Prevent parameter pollution (Http Parameter Pollution)
// Clear up query string
app.use(
  hpp({
    whitelist: [
      'price',
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty'
    ]
  })
);

app.use(compression());

// 2) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// Catch all unknown routes ( this middleware runs after all routes have been defined !)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Final middleware, Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
