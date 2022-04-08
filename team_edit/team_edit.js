import {getParameter, setTextNode} from '../javascript/funcs.js';
import {getBackendUrl} from '../javascript/config.js';

window.addEventListener('load', () => {
    fetchAndDisplayF1Team();
    const teamForm = document.getElementById('teamForm');
    teamForm.addEventListener('submit', event => updateInfo(event));
});

function fetchAndDisplayF1Team() {
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
            displayF1Team(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", getBackendUrl() + "/api/teams/" + getParameter('team'), true);
    xhttp.send();
}

function updateInfo(event) {
    event.preventDefault();

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            fetchAndDisplayF1Team();
        }
    };

    xhttp.open("PUT", getBackendUrl() + "/api/teams/" + getParameter('team'), true);

    const req = {
        "worldChampionshipsWon": document.getElementById('worldChampionshipsWon').value,
        "racesWon": parseInt(document.getElementById('racesWon').value),
        "teamChief": document.getElementById('teamChief').value,
        "chassis": document.getElementById('chassis').value,
    }

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(req));
    window.location.href = "../teams/teams.html";
}

function displayF1Team(team) {
    setTextNode('teamname', team['teamName']);
}