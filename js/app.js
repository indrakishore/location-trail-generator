// Initial Map 
const map = L.map('map-container').setView([28.7041, 77.1025], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Button to start trail generation
const startBtn = document.getElementById('start').addEventListener('click', startTrailing);

function startTrailing() {
    // changing footer text
    document.querySelector('.footer-text').innerHTML = `<h3>Location Trails: </h3>`;

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((pos) => {
            const coords = [pos.coords.latitude, pos.coords.longitude];
            
            // Zooming to the current location
            map.setView(coords, 15);

            // Marker to the current position
            L.marker(coords).addTo(map)
                .bindPopup(`<b>Current Location: </b> ${coords}`).openPopup();
    
            // adding location trail
            const div = document.createElement('div');
            div.className = 'alert alert-info';
            div.innerHTML = `<strong>Latitude:</strong> ${pos.coords.latitude} <strong>Longitude:</strong> ${pos.coords.longitude} <strong>Date/Time:</strong> ${Date()}`;
            document.querySelector('.card-footer').insertBefore(div, document.querySelector('.alert'));
            
        }, (error) => {
            const div = document.createElement('div');
            div.className = 'alert alert-danger mt-3';
            div.innerHTML = `ERROR: ${error.message}. Please refresh and start again.`;
            document.querySelector('.card-body').append(document.querySelector('.map-container'), div);
        }, {
            enableHighAccuracy: true,
            maximumAge: 1000
        });
    } else {
        alert('Geolocation is not supported in this browser.');
    }
}
