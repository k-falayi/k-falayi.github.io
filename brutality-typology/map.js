mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lexyarthur/cl3zanhjp002n14qvvtb0qzzp',
    zoom: 2,
    maxZoom: 9,
    minZoom: 3.2,
    center: [-101, 38],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
});

map.on("load", function () {
  map.addLayer({
    id: "county_typology_outline",
    type: "line",
    source: {
      type: "geojson",
      data: "data/countyTypology.geojson",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.3,
    },
  }, "waterway-label");



  map.addLayer(
    {
      id: "county_typology",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countyTypology.geojson",
      },
      minzoom: 3,
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Nonspecialized",
          "#ab9191",
          "Maufacturing",
          "#6193c7",
          "Farming",
          "#229c38",
          "Federal/State Government",
          "#f8c347",
          "Recreation",
          "#c771ba",
          "Mining",
          "#76e3de",
          "#ffffff",
        ],
      },
    },
    "county_typology_outline"
  );
  
});


// Create the popup


map.on('click', 'county_typology', function (e) {
  var stateName = e.features[0].properties.State;
  var county = e.features[0].properties.County;
  var economicType = e.features[0].properties.Economic_Type_Label;
  var countyClass = e.features[0].properties.countyClass;
  // var total = e.features[0].properties.total;
  // wnrPerc = (wnrPerc * 100).toFixed(0);
  // total = total.toLocaleString();
  stateName = stateName.toUpperCase();
  county = county.toUpperCase();
  economicType = economicType.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>' + county + ' - ' + stateName + '</h2>'
          + '<h4>' + 'Economic type - ' + economicType + '</h4>'
          + '<p>' + 'County Class -' + countyClass + '</p>')
      .addTo(map);
});
map.on('mouseenter', 'county_typology', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'county_typology', function () {
  map.getCanvas().style.cursor = '';
});




mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/lexyarthur/cl41dy6cp000z15p8u15c51pb',
    zoom: 3,
    maxZoom: 12,
    minZoom: 3.2,
    center: [-99, 38],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
});

map2.on("load", function () {
  map2.addLayer(
    {
    id: "states_outline",
    type: "line",
    source: {
        type: "geojson",
        data: "data/statesOutline.geojson",
    },
    paint: {
        "line-color": "#cfcfcf",
        "line-width": 0.7,
    },
  }, "waterway-label");



  map2.addLayer({
      id: "brutality_incident",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/policeBrutality.geojson",
      },
      paint: {
        'circle-color': '#1dab32',
        'circle-stroke-color': '#4d4d4d',
        'circle-stroke-width': 0.4,
        'circle-opacity': 0.3,
        'circle-radius': 5,
        
      }
    });

});



// Create the popup


map2.on('click', 'brutality_incident', function (e) {
  var state = e.features[0].properties.state;
  var incident = e.features[0].properties.description;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h3>' + state + '</h3>'
          + '<p>' + incident + '</p>')
      .addTo(map2);
});
map2.on('mouseenter', 'brutality_incident', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
map2.on('mouseleave', 'brutality_incident', function () {
  map2.getCanvas().style.cursor = '';
});
