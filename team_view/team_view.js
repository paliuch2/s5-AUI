import {
    getParameter,
    clearChildren,
    createLinkCell,
    createButtonCell,
    createTextCell,
    setTextNode
} from '../javascript/funcs.js';
import {getBackendUrl} from '../javascript/config.js';

window.addEventListener('load', () => {
    fetchAndDisplayF1Drivers();
    fetchAndDisplayF1Team();

    const addButton = document.getElementById('add');
    addButton.addEventListener('click', event => addNewF1Team(event));
});


function fetchAndDisplayF1Drivers() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var res = JSON.parse(this.responseText);
            displayF1Drivers(res);
        }
    };

    xhttp.open("GET", getBackendUrl() + '/api/teams/' + getParameter('team') + '/drivers', true);
    xhttp.send();
}

function displayF1Drivers(drivers) {
    let tbody = document.getElementById('tbody');
    clearChildren(tbody);
    drivers.drivers.forEach(driver => {
        tbody.appendChild(createRow(driver));
    })
}

function createRow(driver) {
    let row = document.createElement('tr');
    row.appendChild(createTextCell(driver['startingNo']));
    row.appendChild(createTextCell(driver['name']));
    row.appendChild(createTextCell(driver['surname']));
    row.appendChild(createLinkCell('view', '../driver_view/driver_view.html?team=' + getParameter('team') + '&driver=' + driver.startingNo));
    row.appendChild(createLinkCell('edit', '../driver_edit/driver_edit.html?team=' + getParameter('team') + '&driver=' + driver.startingNo));
    row.appendChild(createButtonCell('delete', () => deleteF1Driver(driver['startingNo'])));
    return row;
}

function deleteF1Driver(driver) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 202) {
            fetchAndDisplayF1Drivers();
        }
    };
    xhttp.open("DELETE", getBackendUrl() + '/api/teams/' + getParameter('team')
        + '/drivers/' + driver, true);
    xhttp.send();
}

function fetchAndDisplayF1Team() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayF1Team(JSON.parse(this.responseText))
        }
    };
    xhttp.open("GET", getBackendUrl() + '/api/teams/' + getParameter('team'), true);
    xhttp.send();
}

function displayF1Team(team) {
    setTextNode('teamname', team['teamName']);
    setTextNode('nation', team['nationality']);
    setTextNode('firstentry', team['firstEntryYear']);
    setTextNode('wchs', team['worldChampionshipsWon']);
    setTextNode('raceswon', team['racesWon']);
    setTextNode('chief', team['teamChief']);
    setTextNode('chassis', team['chassis']);
}

function addNewF1Team(event) {
    window.location.href = "../driver_add/driver_add.html?team=" + getParameter('team');
}