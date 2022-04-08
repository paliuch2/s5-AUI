import {getParameter, setTextNode} from '../javascript/funcs.js';
import {getBackendUrl} from '../javascript/config.js';

window.addEventListener('load', () => {
    fetchAndDisplayF1Driver();
    const driverForm = document.getElementById('driverForm');
    driverForm.addEventListener('submit', event => updateInfo(event));
});

function fetchAndDisplayF1Driver() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let r = JSON.parse(this.responseText);
            for (const [key, value] of Object.entries(r)) {
                let input = document.getElementById(key);
                if (input) {
                    input.value = value;
                }
            }
            displayF1Driver(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", getBackendUrl() + "/api/teams/" + getParameter('team') + "/drivers/" + getParameter('driver'), true);
    xhttp.send();
}

function updateInfo(event) {
    event.preventDefault();

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            fetchAndDisplayF1Driver();
        }
    };

    xhttp.open("PUT", getBackendUrl() + "/api/teams/" + getParameter('team') + "/drivers/" + getParameter('driver'), true);

    const req = {
        "pointsEarned":  parseFloat(document.getElementById('pointsEarned').value),
        "racesWon":  parseInt(document.getElementById('racesWon').value),
        "gpsEntered":  parseInt(document.getElementById('gpsEntered').value),
    }

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(req));
    window.location.href = "../team_view/team_view.html?team=" + getParameter('team');
}

function displayF1Driver(driver) {
    setTextNode('teamname', getParameter('team'));
    setTextNode('driverinfo', driver['startingNo'] + " - "  + driver['name'] + " " + driver['surname']);
}