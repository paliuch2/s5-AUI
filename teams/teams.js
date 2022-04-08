import {clearChildren, createLinkCell, createButtonCell, createTextCell} from '../javascript/funcs.js';
import {getBackendUrl} from '../javascript/config.js';


window.addEventListener('load', () => {
    fetchAndDisplayF1Teams();

   if (document.ready)
    {
        const addButton = document.getElementById('teamForm');
        addButton.addEventListener('onclick', event => addNewF1Team(event));
    }
    
});

function fetchAndDisplayF1Teams() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var res = JSON.parse(this.responseText);
            displayF1Teams(res);
        }
    };
    xhttp.open("GET", getBackendUrl() + '/api/teams', true);
    xhttp.send();
}

function displayF1Teams(teams) {
    let tbody = document.getElementById('tbody');
    clearChildren(tbody);
    teams.teams.forEach(team => {
        tbody.appendChild(createRow(team));
    })
}

function createRow(team) {
    let row = document.createElement('tr');
    row.appendChild(createTextCell(team['teamName']));
    row.appendChild(createLinkCell('view','../team_view/team_view.html?team=' + team['teamName']));
    row.appendChild(createLinkCell('edit', '../team_edit/team_edit.html?team='+ team['teamName']));
    row.appendChild(createButtonCell('delete', () => deleteF1Team(team['teamName'])));
    return row;
}

function deleteF1Team(team) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 204) {
            fetchAndDisplayF1Teams();
        }
    };
    req.open("DELETE", getBackendUrl() + '/api/teams/' + team, true);
    req.send();
}

