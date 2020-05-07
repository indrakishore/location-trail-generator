// Initial Map 
const map = L.map('map-container').setView([28.7041, 77.1025], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Buttons
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

// Event to start trail generation
startBtn.addEventListener('click', startTrailing);
// Event to stop trail generation
stopBtn.addEventListener('click', stopTrailing);

let watchID;

function startTrailing() {

    if (navigator.geolocation) {
        // changing footer text
        document.querySelector('.footer-text').innerHTML = `<h3>Location Trails: </h3>`;
        // Changing button colors
        startBtn.className = 'btn btn-success btn-sm';
        stopBtn.className = 'btn btn-warning btn-sm';

        showMessage(`<strong>Trail generation started.  Date/Time:</strong> ${Date()}`, 'success');

        watchID = navigator.geolocation.watchPosition(successCallback, errorCallback, {desiredAccuracy:20, maxWait:15000});
    } else {
        alert('Geolocation is not supported in this browser.');
    }
}

function successCallback(pos) {

    const coords = [pos.coords.latitude, pos.coords.longitude];
    
    // Zooming to the current location
    map.setView(coords, 15);

    // Marker to the current position
    L.marker(coords).addTo(map)
        .bindPopup(`<b>Current Location: </b> ${coords}`).openPopup();

    // adding location trail
    showMessage(`<strong>Accuracy:</strong> ${pos.coords.accuracy}  <strong>Latitude:</strong> ${pos.coords.latitude} <strong>Longitude:</strong> ${pos.coords.longitude} <strong>Date/Time:</strong> ${Date()}`, 'dark');
    
}

function errorCallback(err) {
    const div = document.createElement('div');
    div.className = 'alert alert-danger mt-3';
    div.innerHTML = `ERROR: ${err.message}. Please refresh and start again.`;
    document.querySelector('.card-body').append(document.querySelector('.map-container'), div);
}

function stopTrailing() {
    // Changing button colors
    startBtn.className = 'btn btn-primary btn-sm';
    stopBtn.className = 'btn btn-danger btn-sm';
    navigator.geolocation.clearWatch(watchID);

    showMessage(`<strong>Trail generation stopped.  Date/Time:</strong> ${Date()}`, 'danger');
}

function showMessage(msg, msgClass) {
    const div = document.createElement('div');
    div.className = `badge badge-${msgClass}`;
    div.innerHTML = msg;
    document.querySelector('.card-footer').insertBefore(div, document.querySelector('.badge'));
}