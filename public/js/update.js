import { removeOption } from './remove.js';

export function newInput(typeOfInput, factor) {
    const amount = document.getElementById(`${typeOfInput}LinesInput`).childElementCount;
    const li = document.getElementById(`${typeOfInput}LinesInput`);

    const extraOption = document.createElement('div');
    extraOption.setAttribute('class', 'newLineOption');
    extraOption.setAttribute('id', `${typeOfInput}Option${amount}`);
    li.appendChild(extraOption);

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', `${typeOfInput}Input${amount}`);
    input.addEventListener('input', () => drawLine(typeOfInput, input.value, factor, input.id));
    extraOption.appendChild(input);

    const remove = document.createElement('button');
    remove.innerHTML = `&#10006;`;
    remove.addEventListener('click', () => removeOption(typeOfInput, amount));
    extraOption.appendChild(remove);
}

export function drawLine(typeOfInput, value, factor, id) {
    const rectangle = document.getElementById('rectangle');
    const rectHeight = rectangle.clientHeight;
    const rectWidth = rectangle.clientWidth;

    const pos = Math.round(value * factor);

    let lineId = `${typeOfInput}Line${id.slice(typeOfInput.length + 5)}`;
    let line = document.getElementById(lineId);

    if (line != null) {
        line.remove();
    }
    
    const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    newLine.setAttribute('id', lineId);
    newLine.setAttribute("stroke", "red");
    newLine.setAttribute("stroke-width", "1");

    if (typeOfInput === "height") {
        newLine.setAttribute('x1', '0');
        newLine.setAttribute('y1', `${pos}`);
        newLine.setAttribute('x2', `${rectWidth}`);
        newLine.setAttribute('y2', `${pos}`);
    } else if (typeOfInput === "width") {
        newLine.setAttribute('x1', `${pos}`);
        newLine.setAttribute('y1', '0');
        newLine.setAttribute('x2', `${pos}`);
        newLine.setAttribute('y2', `${rectHeight}`);
    }
    
    rectangle.appendChild(newLine);
}
