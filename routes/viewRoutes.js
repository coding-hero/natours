const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/me', authController.protect, viewController.renderAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

router.post('/submit-user-data', viewController.updateUserData);

router.use(authController.isLoggedIn);

router.get('/', viewController.renderOverviewPage);
router.get('/tour/:slug', viewController.renderTourPage);
router.get('/login', viewController.renderLoginPage);

module.exports = router;
