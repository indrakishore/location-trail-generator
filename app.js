// Initial Map 
const map = new ol.Map({
    target: 'map-container',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([77.1025, 28.7041]), // initial location set to delhi
        zoom: 2
    })
});

const startBtn = document.getElementById('start'); // Button to start trail generation
const source = new ol.source.Vector();
const layer = new ol.layer.Vector({
    source: source
});

startBtn.addEventListener('click', startTrailing); // event

function startTrailing() {
    map.addLayer(layer);

    navigator.geolocation.watchPosition(function (pos) {
        const coords = [pos.coords.longitude, pos.coords.latitude];
        const accuracy = new ol.geom.Polygon(coords, pos.coords.accuracy);
        source.clear(true);
        source.addFeatures([
            new ol.Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())),
            new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords)))
        ]);
    }, function (error) {
        alert(`ERROR: ${error.message}`);
    }, {
        enableHighAccuracy: false
    });
}
