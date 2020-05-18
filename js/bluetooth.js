const blLog = document.querySelector('.blearea');

// Event to start bluetooth
document.querySelector('#startbt').addEventListener('click', startBluetooth);

function startBluetooth() {
    // Accessing bluetooth
    navigator.bluetooth.requestDevice({ acceptAllDevices: true })
        .then(device => {
            blLog.className = 'alert alert-info';
            blLog.innerHTML = `
                <strong>Name: </strong>${device.name}<br>
                <strong>Device ID: </strong>${device.id}<br>
                <strong>Connected: </strong>${device.gatt.connected}<br>
                `;
        })
        .catch(error => {
            blLog.className = 'alert alert-danger';
            blLog.innerHTML = `Error: ${error}`;
        });
}