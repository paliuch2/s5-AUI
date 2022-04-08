export function clearChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

export function createButtonCell(text, action) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(text));
    button.classList.add('ui-control', 'ui-button');
    cell.appendChild(button);
    button.addEventListener('click', action);
    return cell;
}

export function createLinkCell(text, url) {
    const cell = document.createElement('td');
    const a = document.createElement('a');
    a.appendChild(document.createTextNode(text));
    a.href = url;
    cell.appendChild(a);
    return cell;
}

export function createTextCell(text) {
    const cell = document.createElement('td');
    cell.appendChild(document.createTextNode(text));
    return cell;
}

export function getParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

export function setTextNode(id, text) {
    let el = document.getElementById(id);
    clearChildren(el);
    el.appendChild(document.createTextNode(text));
}