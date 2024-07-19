mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lexyarthur/cl4up1owl000i14qoolt282hd',
    zoom: 3.1,
    maxZoom: 7,
    minZoom: 2.5,
    center: [-95.644, 39.647],
    projection: 'albers'
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
  
    map.addLayer(
      {
        id: "state_wildfire_layer",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/statesData.geojson",
        },
        minzoom: .5,
        paint: {
          "fill-color": [
              'interpolate',
              ['linear'],
              ['get', 'Expected Annual HU Exposed'],
              46.8,
              '#ffffb2',
              198.8,
              '#fed976',
              535.6,
              '#feb24c',
              793.8,
              '#fd8d3c',
              13653,
              '#fc4e2a',
            ],
          "fill-opacity": 0.75
        }
      }, 'waterway-label');

});







//Create the popup



map.on('click', 'state_wildfire_layer', function (e) {
    var state = e.features[0].properties.NAME;
    var exposedHUs = e.features[0].properties['Total number of exposed HUs'];
    var EAHUsExposed = e.features[0].properties['Expected Annual HU Exposed'];
    var pctDirectExposure = e.features[0].properties['Fraction EAHUexposed-Direct'];
    // var total = e.features[0].properties.total;
    // pctChange = (pctChange * 100).toFixed(0);
    // pctChange = pctChange.toLocaleString();
    // countryName = stateName.toUpperCase()
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h2>' + state + '</h2>'
            + '<h4>' + 'Total exposed —' + exposedHUs + ' housing units' + '</h4>'
            + '<h3>' + 'Expected Annual Exposed: ' + EAHUsExposed + ' HUs' + '</h3>'
            + '<h3>' + 'Expected Annual HUs with Direct Exposure: ' + pctDirectExposure * 100 + '%' + '</h3>')
        .addTo(map);
});
map.on('mouseenter', 'state_wildfire_layer', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'state_wildfire_layer', function () {
    map.getCanvas().style.cursor = '';
});





//second map

mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/lexyarthur/cl4w0r1gk004714p55fnxd94y', 
    zoom: 4.8,
//     maxZoom: 9,
//     minZoom: 3,
    center: [-120.818, 37.024],
    projection: 'albers'
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

    map2.addLayer(
    {
        id: "cali_wildfire_layer",
        type: "fill",
        source: {
        type: "geojson",
        data: "data/CaliData.geojson",
        },
        maxzoom: 5,
        paint: {
        "fill-color": '#fc4e2a',
        "fill-opacity": 0.75
        }
    }, 'waterway-label');


    map2.addLayer(
        {
          id: "cali_counties_outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/caliCounties.geojson",
          },
          minzoom: 5,
          paint: {
            "line-color": "#ffffff",
            "line-width": 0.25,
          },
        },
        "cali_wildfire_layer"
    );



    map2.addLayer(
        {
          id: "cali_counties",
          type: "fill",
          source: {
            type: "geojson",
            data: "data/caliCounties.geojson",
          },
          minzoom: 5,
          paint: {
            "fill-color": [
                'interpolate',
                ['linear'],
                ['get', 'Expected Annual HU Exposed'],
                46.8,
                '#ffffb2',
                49,
                '#fed976',
                109.8,
                '#feb24c',
                171.8,
                '#fd8d3c',
                3416,
                '#fc4e2a',
              ],
            "fill-opacity": 0.75,
          },

    }, 'cali_counties_outline');

});



//Popup



map2.on('click', 'cali_counties', function (e) {
    var county = e.features[0].properties.NAME_x;
    var exposedHUs = e.features[0].properties['Total number of exposed HUs'];
    var EAHUsExposed = e.features[0].properties['Expected Annual HU Exposed'];
    var pctDirectExposure = e.features[0].properties['Fraction EAHUexposed-Direct'];
    // var total = e.features[0].properties.total;
    // pctChange = (pctChange * 100).toFixed(0);
    // pctChange = pctChange.toLocaleString();
    // countryName = stateName.toUpperCase()
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h2>' + county + '</h2>'
            + '<h4>' + 'Total exposed —' + exposedHUs + ' housing units' + '</h4>'
            + '<h3>' + 'Expected Annual Exposed: ' + EAHUsExposed + ' HUs' + '</h3>'
            + '<h3>' + 'Expected Annual HUs with Direct Exposure: ' + pctDirectExposure  + '%' + '</h3>')
        .addTo(map2);
});
map2.on('mouseenter', 'cali_counties', function () {
    map2.getCanvas().style.cursor = 'pointer';
});
map2.on('mouseleave', 'cali_counties', function () {
    map2.getCanvas().style.cursor = '';
});


