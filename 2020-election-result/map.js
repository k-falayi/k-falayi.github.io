mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lexyarthur/cl3ugxt7b000i14npbww0bkvy',
    zoom: 3,
    maxZoom: 9,
    minZoom: 3.2,
    center: [-99, 38],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
});

map.on("load", function () {
  map.addLayer({
    id: "us_states_elections_outline",
    type: "line",
    source: {
      type: "geojson",
      data: "https://storage.googleapis.com/az-elex-maps/us-election-results/data/statesElections.geojson",
    },
    paint: {
      "line-color": "#ffffff",
      "line-width": 0.7,
    },
  }, "waterway-label");

  map.addLayer({
    id: "us_states_elections",
    type: "fill",
    source: {
      type: "geojson",
      data: "https://storage.googleapis.com/az-elex-maps/us-election-results/data/statesElections.geojson",
    },
    maxzoom: 6,
    paint: {
      "fill-color": [
        "match",
        ["get", "Winner"],
        "Donald J Trump", "#cf635d",
        "Joseph R Biden Jr", "#6193c7",
        "Other", "#91b66e",
        "#ffffff",
      ],
      "fill-outline-color": "#ffffff",
      "fill-opacity": [
        "step",
        ["get", "WnrPerc"],
        0.3, 0.4,
        0.5, 0.5,
        0.7, 0.6,
        0.9,
      ],
    },
  }, "us_states_elections_outline");


  map.addLayer(
    {
      id: "us_counties_elections_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "https://storage.googleapis.com/az-elex-maps/us-election-results/data/countiesElections.geojson",
      },
      minzoom: 6,
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.25,
      },
    },
    "us_states_elections"
  );
  map.addLayer(
    {
      id: "us_counties_elections",
      type: "fill",
      source: {
        type: "geojson",
        data: "https://storage.googleapis.com/az-elex-maps/us-election-results/data/countiesElections.geojson",
      },
      minzoom: 6,
      paint: {
        "fill-color": [
          "match",
          ["get", "Winner"],
          "Donald J Trump",
          "#cf635d",
          "Joseph R Biden Jr",
          "#6193c7",
          "Other",
          "#91b66e",
          "#ffffff",
        ],
        "fill-outline-color": "#000000",
        "fill-opacity": [
          "step",
          ["get", "WnrPerc"],
          0.3,
          0.4,
          0.5,
          0.5,
          0.7,
          0.6,
          0.9,
        ],
      },
    },
    "us_counties_elections_outline"
  );
  
});


// Create the popup
map.on('click', 'us_states_elections', function (e) {
  var stateName = e.features[0].properties.State;
  var winner = e.features[0].properties.Winner;
  var wnrPerc = e.features[0].properties.WnrPerc;
  var totalVotes = e.features[0].properties.Total;
  wnrPerc = (wnrPerc * 100).toFixed(0);
  totalVotes = totalVotes.toLocaleString();
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+stateName+'</h4>'
          +'<h2>'+winner+'</h2>'
          + '<p>'+wnrPerc+'% - ('+totalVotes+' votes)</p>')
      .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on('mouseenter', 'us_states_elections', function () {
  map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'us_states_elections', function () {
  map.getCanvas().style.cursor = '';
});

map.on('click', 'us_counties_elections', function (e) {
  var stateName = e.features[0].properties.State;
  var countyName = e.features[0].properties.County;
  var winner = e.features[0].properties.Winner;
  var wnrPerc = e.features[0].properties.WnrPerc;
  var totalVotes = e.features[0].properties.Total;
  wnrPerc = (wnrPerc * 100).toFixed(0);
  totalVotes = totalVotes.toLocaleString();
  stateName = stateName.toUpperCase();
  countyName = countyName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countyName + ' - ' + stateName + '</h4>'
          + '<h2>' + winner + '</h2>'
          + '<p>' + wnrPerc + '% - (' + totalVotes + ' votes)</p>')
      .addTo(map);
});
map.on('mouseenter', 'us_counties_elections', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'us_counties_elections', function () {
  map.getCanvas().style.cursor = '';
});


// to put a picture of a candidate in the popup
/*
map.on('click', 'us_states_elections', function (e) {
  var stateName = e.features[0].properties.State;
  var winner = e.features[0].properties.Winner;
  var imagePath;
  if (winner == 'Donald J Trump'){
      imagePath = 'img/trump.jpg';
  }
  else{
      imagePath = 'img/biden.jpg';
  }
  var wnrPerc = e.features[0].properties.WnrPerc;
  var totalVotes = e.features[0].properties.Total;
  wnrPerc = (wnrPerc * 100).toFixed(0);
  totalVotes = totalVotes.toLocaleString();
  stateName = stateName.toUpperCase();
  console.log(imagePath);
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+stateName+'</h4>'
          +'<h2>'+winner+'</h2>'
          + '<p>'+wnrPerc+'% - ('+totalVotes+' votes)<br>'
          + '<img src="' + imagePath + '"></p>')
      .addTo(map);
});
*/




mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/lexyarthur/cl3ugxt7b000i14npbww0bkvy',
    zoom: 3,
    maxZoom: 9,
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
      id: "us_counties_centroids",
      type: "circle",
      source: {
        type: "geojson",
        data: "data/countiesPoints.geojson",
      },
      paint: {
        'circle-radius':
        ['interpolate', ['linear'], ['zoom'],
            3, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 40], 1],
            9, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Trump'], ['get', 'Biden']]]], 15], 5],
        ],
    
        "circle-color": [
          "match",
          ["get", "Winner"],
          "Donald J Trump",
          "#cf635d",
          "Joseph R Biden Jr",
          "#6193c7",
          "Other",
          "#91b66e",
          "#ffffff",
        ],
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 0.5,
        "circle-opacity": [
          "step",
          ["get", "WnrPerc"],
          0.3,
          0.4,
          0.5,
          0.5,
          0.7,
          0.6,
          0.9,
        ],
      },
      minzoom: 3,
    },
    "waterway-label"
  );
    map2.addLayer(
        {
        id: "us_states_elections_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "data/statesElections.geojson",
        },
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.7,
        },
        },
        "us_counties_centroids"
    );
    map2.addLayer(
        {
        id: "us_counties_elections_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "data/countiesElections.geojson",
        },
        minzoom: 6,
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.25,
        },
        },
        "us_states_elections_outline"
    );
});


// Create the popup

map2.on('click', 'us_counties_centroids', function (e) {
  var stateName = e.features[0].properties.State;
  var countyName = e.features[0].properties.County;
  var winner = e.features[0].properties.Winner;
  var wnrPerc = e.features[0].properties.WnrPerc;
  var totalVotes = e.features[0].properties.Total;
  wnrPerc = (wnrPerc * 100).toFixed(0);
  totalVotes = totalVotes.toLocaleString();
  stateName = stateName.toUpperCase();
  countyName = countyName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>' + countyName + ' - ' + stateName + '</h4>'
          + '<h2>' + winner + '</h2>'
          + '<p>' + wnrPerc + '% - (' + totalVotes + ' votes)</p>')
      .addTo(map2);
});
map2.on('mouseenter', 'us_counties_centroids', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
map2.on('mouseleave', 'us_counties_centroids', function () {
  map2.getCanvas().style.cursor = '';
});


