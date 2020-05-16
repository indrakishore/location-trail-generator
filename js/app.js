// Initial Map 
const map = L.map('map').setView([28.7041, 77.1025], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Buttons
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const btBtn = document.getElementById('startbt');

// Event to start trail generation
startBtn.addEventListener('click', startTrailing);
// Event to stop trail generation
stopBtn.addEventListener('click', stopTrailing);
// Event to start bluetooth
btBtn.addEventListener('click', () => {
        // let device = await navigator.bluetooth.requestDevice()
        //     .then(dev => dev.gett.connect());
        // showMessage(device, 'alert-info');
});

const gl = navigator.geolocation;
let watchID;
function startTrailing() {
    if (gl) {
        // changing footer text
        document.querySelector('.footer-text').innerHTML = `<h3>Location Trails: </h3>`;
        // Changing button colors
        startBtn.className = 'btn btn-success btn-sm';
        stopBtn.className = 'btn btn-warning btn-sm';

        showMessage(`<strong>Trail generation started at</strong> ${Date()}`, 'bg-success');

        watchID = gl.watchPosition(successCallback, errorCallback, {enableHighAccuracy:true});

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
    showMessage(`<strong>Latitude:</strong> ${pos.coords.latitude} <strong>Longitude:</strong> ${pos.coords.longitude} <strong>Date/Time:</strong> ${Date()}`);
    
}

function errorCallback(err) {
    showMessage(`ERROR: ${err.message}. Please refresh and start again.`, 'bg-danger');
}

function stopTrailing() {
    // Changing button colors
    startBtn.className = 'btn btn-primary btn-sm';
    stopBtn.className = 'btn btn-danger btn-sm';
    navigator.geolocation.clearWatch(watchID);

    showMessage(`<strong>Trail generation stopped at</strong> ${Date()}`, 'bg-warning');
}

function showMessage(msg, msgClass) {
    const div = document.createElement('div');
    div.className = `alert ${msgClass} text-xl`;
    div.innerHTML = '>> ' + msg;
    document.querySelector('.card-footer').insertBefore(div, document.querySelector('.alert'));
}