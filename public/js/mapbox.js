/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibXN0Z2giLCJhIjoiY2syOGk0MWZxMXhkdzNubXFobjRxNGRibiJ9.BnUuw7_HtunZuQtsfdOqpg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mstgh/ck2cypjah0wqg1cmtjyajfps3',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 5
  });

  // Display Area
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // 1) Create the marker
    const el = document.createElement('div');
    el.className = 'marker';

    // 2) Add marker to the map
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // 3) Add popup the the marker  
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // 4) Extend map bounds to include current location 
    bounds.extend(loc.coordinates);
  });

  // Finally fit the bounds inside of the map! (:
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      right: 100,
      bottom: 150,
      left: 100
    }
  });
};
