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