import {setTextNode, getParameter} from '../javascript/funcs.js';
import {getBackendUrl} from '../javascript/config.js';

window.addEventListener('load', () => {
    fetchAndDisplayF1Driver();
});

function fetchAndDisplayF1Driver() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayF1Driver(JSON.parse(this.responseText))
        }
    };
    xhttp.open("GET", getBackendUrl() + '/api/teams/' + getParameter('team') + "/drivers/" + getParameter('driver'), true);
    xhttp.send();
}

function displayF1Driver(driver){
    setTextNode('team', getParameter('team'));
    setTextNode('driverinfo', driver['startingNo'] + " - "  + driver['name'] + " " + driver['surname']);
    setTextNode('nation', driver['nationality']);
    setTextNode('dob', driver['dateOfBirth']);
    setTextNode('pob', driver['placeOfBirth']);
    setTextNode('points', driver['pointsEarned']);
    setTextNode('wins', driver['racesWon']);
    setTextNode('gps', driver['gpsEntered']);
}