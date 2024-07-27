import { removeOption } from './remove.js';

export function newInput(typeOfInput, factor){
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
    remove.setAttribute('onclick', `removeOption("${typeOfInput}", ${amount})`);
    remove.innerHTML = `&#10006;`;
    extraOption.appendChild(remove);
}

export function drawLine(typeOfInput, value, factor, id){
    const rectangle = document.getElementById('rectangle');
    const rectHeight = rectangle.clientHeight;
    const rectWidth = rectangle.clientWidth;
    console.log(`${typeOfInput} will be drawn on ${Math.round(value * factor)}`);

    const pos = Math.round(value * factor)

    let lineId = null;
    let line = null;
    let attributes = {};

    if(typeOfInput == "height"){
        lineId = `${typeOfInput}Line${id.slice(11)}`;
        line = document.getElementById(`${lineId}`);
        attributes = {"x1": "0", "y1": `${pos}`, "x2" :`${rectWidth}`, "y2" :`${pos}`, "stroke" :"red", "stroke-width": "2", "id" :`${lineId}`}
        console.log(`Attributes are: ${attributes}`)

    } else if(typeOfInput == "width"){
        lineId = `${typeOfInput}Line${id.slice(10)}`;
        line = document.getElementById(`${lineId}`);
        attributes = {"x1": `${pos}`, "y1": `0`, "x2" :`${pos}`, "y2" :`${rectHeight}`, "stroke" :"red", "stroke-width": "2", "id" :`${lineId}`}
        console.log(`Attributes are: ${attributes}`)
    }

    if (line == null){
        const newLine = document.createElement('line');
        setAttributes(newLine, attributes);
        rectangle.appendChild(newLine);
    } else if (line != null){
        line.remove();
        const newLine = document.createElement('line');
        setAttributes(newLine, attributes);
        rectangle.appendChild(newLine);
    }
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }