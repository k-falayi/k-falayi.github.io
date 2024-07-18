mapboxgl.accessToken = 'pk.eyJ1IjoibGV4eWFydGh1ciIsImEiOiJja3gwc3M3dHoxN3ByMnZteDNudDlpdnZpIn0.HXYwk_xfqXfstu4CSVHVpQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lexyarthur/cl4ixujtw007314muc6keg5wh',
    zoom: 1,
    maxZoom: 6,
    minZoom: .5,
    center: [3.158, 24.797],//[10.108, 35.221],
    projection: 'winkelTripel'
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
      id: "gas-flare",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/gas-flare.geojson",
      },
      minzoom: .5,
      paint: {
        "fill-color": [
            'interpolate',
            ['linear'],
            ['get', 'flare_21'],
            1,
            '#ffffb2',
            5,
            '#fed976',
            10,
            '#feb24c',
            15,
            '#fd8d3c',
            20,
            '#fc4e2a',
            25,
            '#e31a1c',
          ],
        "fill-opacity": 0.75
      }
    }, 'waterway-label');
  
});


//Create the popup

map.on('click', 'gas-flare', function (e) {
  var countryName = e.features[0].properties.country;
  var flareAmount = e.features[0].properties.flare_21;
  var Change = e.features[0].properties.change_20_21;
  // var total = e.features[0].properties.total;
  // pctChange = (pctChange * 100).toFixed(0);
  // pctChange = pctChange.toLocaleString();
  // countryName = stateName.toUpperCase()
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>' + countryName + '</h2>'
          + '<h4>' + 'Amount of gas flared in 2020 —' + flareAmount + 'billion cubic meters' + '</h4>'
          + '<p>' + 'Change from 2020-21: ' + '</p>' + '<h3>' + Change + ' billion ' + 'm' + '<sup>'+ '3' + '</sup>' + '</h3>')
      .addTo(map);
});
map.on('mouseenter', 'gas-flare', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'gas-flare', function () {
  map.getCanvas().style.cursor = '';
});



// const gasLegendEl = document.getElementById('gas-flare-legend');
// map.on('zoom', () => {
// if (map.getZoom() > zoomThreshold) {
// gasLegendEl.style.display = 'block';
// } else {
// gasLegendEl.style.display = 'none';
// }
// });

