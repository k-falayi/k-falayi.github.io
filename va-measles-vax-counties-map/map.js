// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2hybyIsImEiOiJjbWE1cW4wbHAwaWs2Mm1xNHkzbjRtNnRoIn0.JKlYa0vasylBTfhCoNMoAg';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-79, 38.2],  // Virginia
    zoom: 6.8,
    maxZoom: 9,
    minZoom: 3
});

map.on('load', () => {
    // Load GeoJSON source
    map.addSource('vaccination', {
        type: 'geojson',
        data: 'data/va-kindergarten-vaccination-results.geojson'
    });

    // Add fill layer for counties
    map.addLayer({
        id: 'vaccination-layer',
        type: 'fill',
        source: 'vaccination',
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'Avg MMR Rate'],
                65, '#cb181d',   // deep red
                72, '#fb6a4a',   // medium red
                80, '#fcae91',   // lighter red
                87, '#fee5d9',   // very light red
                94.99, '#fee5d9', // keep last red at just below 95
                95, '#deebf7',   // light blue starts at 95
                100, '#023b96'   // deep blue
            ],
            'fill-opacity': 0.9,
            'fill-outline-color': '#0a0a0a'
        }
    });

    // Add tooltip on hover
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mousemove', 'vaccination-layer', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        const props = e.features[0].properties;
        const countyCity = props['County_city'] || 'N/A';
        const totalStudents = props['Total Students'] || 'N/A';
        const mmrRate = props['Avg MMR Rate'] || 'N/A';

        const html = `
            <strong>${countyCity}</strong><br>
            <hr>
            Total Students: ${totalStudents}<br>
            Avg MMR Rate: ${mmrRate}%
        `;

        popup.setLngLat(e.lngLat)
             .setHTML(html)
             .addTo(map);
    });

    map.on('mouseleave', 'vaccination-layer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        map.resize();
    }, 200);  // Adjust delay as needed
});