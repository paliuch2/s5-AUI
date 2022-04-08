import {getParameter, setTextNode} from '../javascript/funcs.js';
import {getBackendUrl} from '../javascript/config.js';

window.addEventListener('load', () => {
    const teamForm = document.getElementById('teamForm');
    teamForm.addEventListener('submit', event => addInfo(event));

    if (document.ready) {
        fetchAndDisplayF1Team();
    }
});

function addInfo(event) {
    event.preventDefault();

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            fetchAndDisplayF1Team();
        }
    };

    xhttp.open("POST", getBackendUrl() + "/api/teams", true);

    const req = {
        "teamName": document.getElementById('teamName').value,
        "nationality": document.getElementById('nationality').value,
        "firstEntryYear": document.getElementById('firstEntryYear').value,
        "worldChampionshipsWon": document.getElementById('worldChampionshipsWon').value,
        "racesWon": parseInt(document.getElementById('racesWon').value),
        "teamChief": document.getElementById('teamChief').value,
        "chassis": document.getElementById('chassis').value,
    }

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(req));
    window.location.href = "../teams/teams.html";
}

