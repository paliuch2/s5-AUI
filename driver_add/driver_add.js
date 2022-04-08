import {getParameter, setTextNode} from '../javascript/funcs.js';
import {getBackendUrl} from '../javascript/config.js';

window.addEventListener('load', () => {
    displayF1Team();
    const driverForm = document.getElementById('driverForm');
    driverForm.addEventListener('submit', event => addInfo(event));
});

function addInfo(event) {
    event.preventDefault();

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayF1Team();
        }
    };

    xhttp.open("POST", getBackendUrl() + "/api/teams/" + getParameter('team') + "/drivers" , true);

    console.log(getBackendUrl() + "/api/teams/" + getParameter('team') + "/drivers");

    const req = {
        "startingNo":  parseInt(document.getElementById('startingNo').value),
        "name": document.getElementById('name').value,
        "surname": document.getElementById('surname').value,
        "nationality": document.getElementById('nationality').value,
        "dateOfBirth":  document.getElementById('dateOfBirth').value,
        "placeOfBirth": document.getElementById('placeOfBirth').value,
        "pointsEarned":  parseFloat(document.getElementById('pointsEarned').value),
        "racesWon":  parseInt(document.getElementById('racesWon').value),
        "gpsEntered":  parseInt(document.getElementById('gpsEntered').value),
    }

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.send(JSON.stringify(req));

   window.location.href = "../team_view/team_view.html?team=" + getParameter('team');
}

function displayF1Team(team) {
    setTextNode('teamname', getParameter('team'));
}

