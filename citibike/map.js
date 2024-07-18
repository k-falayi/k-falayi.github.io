mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lexyarthur/cl4akkh88000g14pq9tzn7j1e',
    zoom: 10,
    center: [-74, 40.740],
    maxZoom: 15,
    minZoom: 8,
    maxBounds: [[-74.45, 40.45], [-73.55, 41]]
});



map.on('load', function () {
    // This is the function that finds the first symbol layer
    let layers = map.getStyle().layers;
    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map.addLayer({
        id: "citibike-start20",
        type: "circle",
        source: {
        type: "geojson",
        data: "data/citiStartsGeo20.geojson",
        },
        paint: {
        'circle-color': '#dd31f7',
        'circle-stroke-color': '#4d4d4d',
        'circle-stroke-width': 0.4,
        'circle-opacity': 0.3,
        'circle-radius': {
            'property': 'tripCount',
            'stops': [
            [10, 1],
            [14000, 20]
            ]
        }
        }
    }, firstSymbolId);

});

//popup

map.on('click', 'citibike-start20', function (e) {
    var stationName = e.features[0].properties['start station name'];
    var tripCount = e.features[0].properties.tripCount;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' +'Station name' + ': ' + stationName + '</h4>'
            + '<h2>' + 'Number of departures from station' + ': ' + tripCount + '</h2>')
        .addTo(map);
  });
  map.on('mouseenter', 'citibike-start20', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'citibike-start20', function () {
    map.getCanvas().style.cursor = '';
  });
  
  
  





mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/lexyarthur/cl4akkh88000g14pq9tzn7j1e',
    zoom: 10,
    center: [-74, 40.740],
    maxZoom: 15,
    minZoom: 8,
    maxBounds: [[-74.45, 40.45], [-73.55, 41]]
});


map2.on('load', function () {
    // This is the function that finds the first symbol layer
    let layers = map2.getStyle().layers;
    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map2.addLayer({
        id: "citibike-stop20",
        type: "circle",
        source: {
        type: "geojson",
        data: "data/citiStopsGeo20.geojson",
        },
        paint: {
        'circle-color': '#dd31f7',
        'circle-stroke-color': '#4d4d4d',
        'circle-stroke-width': 0.4,
        'circle-opacity': 0.3,
        'circle-radius': {
            'property': 'tripCount',
            'stops': [
            [10, 1],
            [14000, 20]
            ]
        }   
        }
    }, firstSymbolId);

});

//popup

map2.on('click', 'citibike-stop20', function (e) {
    var stationName = e.features[0].properties['end station name'];
    var tripCount = e.features[0].properties.tripCount;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' +'Number of arrivals at station' + ': ' + stationName + '</h4>'
            + '<h2>' + 'Trips' + ': ' + tripCount + '</h2>')
        .addTo(map2);
  });
  map2.on('mouseenter', 'citibike-stop20', function () {
    map2.getCanvas().style.cursor = 'pointer';
  });
  map2.on('mouseleave', 'citibike-stop20', function () {
    map2.getCanvas().style.cursor = '';
  });
  



mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map3 = new mapboxgl.Map({
    container: 'map3',
    style: 'mapbox://styles/lexyarthur/cl4akkh88000g14pq9tzn7j1e',
    zoom: 10,
    center: [-74, 40.740],
    maxZoom: 15,
    minZoom: 8,
    maxBounds: [[-74.45, 40.45], [-73.55, 41]]
});



map3.on('load', function () {
    // This is the function that finds the first symbol layer
    let layers = map3.getStyle().layers;
    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map3.addLayer({
        id: "citibike-start21",
        type: "circle",
        source: {
        type: "geojson",
        data: "data/citiStartsGeo21.geojson",
        },
        paint: {
        'circle-color': '#dd31f7',
        'circle-stroke-color': '#4d4d4d',
        'circle-stroke-width': 0.4,
        'circle-opacity': 0.3,
        'circle-radius': {
            'property': 'tripCount',
            'stops': [
            [10, 1],
            [14000, 20]
            ]
        }
        }
    }, firstSymbolId);

});

map3.on('click', 'citibike-start21', function (e) {
    var stationName = e.features[0].properties['start_station_name'];
    var tripCount = e.features[0].properties.tripCount;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' +'Number of departures from station' + ': ' + stationName + '</h4>'
            + '<h2>' + 'Trips' + ': ' + tripCount + '</h2>')
        .addTo(map3);
  });
  map3.on('mouseenter', 'citibike-start21', function () {
    map3.getCanvas().style.cursor = 'pointer';
  });
  map3.on('mouseleave', 'citibike-start21', function () {
    map3.getCanvas().style.cursor = '';
  });
  


mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map4 = new mapboxgl.Map({
    container: 'map4',
    style: 'mapbox://styles/lexyarthur/cl4akkh88000g14pq9tzn7j1e',
    zoom: 10,
    center: [-74, 40.740],
    maxZoom: 15,
    minZoom: 8,
    maxBounds: [[-74.45, 40.45], [-73.55, 41]]
});



map4.on('load', function () {
    // This is the function that finds the first symbol layer
    let layers = map4.getStyle().layers;
    let firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map4.addLayer({
        id: "citibike-stop21",
        type: "circle",
        source: {
        type: "geojson",
        data: "data/citiStopsGeo21.geojson",
        },
        paint: {
        'circle-color': '#dd31f7',
        'circle-stroke-color': '#4d4d4d',
        'circle-stroke-width': 0.4,
        'circle-opacity': 0.3,
        'circle-radius': {
            'property': 'tripCount',
            'stops': [
            [10, 1],
            [14000, 20]
            ]
        }
        }
    }, firstSymbolId);

});

map4.on('click', 'citibike-stop21', function (e) {
    var stationName = e.features[0].properties['end_station_name'];
    var tripCount = e.features[0].properties.tripCount;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' +'NUmber of arrivals at station' + ': ' + stationName + '</h4>'
            + '<h2>' + 'Trips' + ': ' + tripCount + '</h2>')
        .addTo(map4);
  });
  map4.on('mouseenter', 'citibike-stop21', function () {
    map4.getCanvas().style.cursor = 'pointer';
  });
  map4.on('mouseleave', 'citibike-stop21', function () {
    map4.getCanvas().style.cursor = '';
  });
  