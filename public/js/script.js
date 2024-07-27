// document.addEventListener('DOMContentLoaded', function() {
//     const apiUrl = 'http://localhost:3000/api'; // https://snijlijst-api.netlify.app/.netlify/functions/api
    
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             const h1 = document.createElement('h1');
//             h1.textContent = data.message;
//             document.body.appendChild(h1);
//         })
//         .catch(error => console.error('Error:', error));
// });

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dimensionsForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const baseUrl = "http://localhost:3000" // https://snijlijst-api.netlify.app/.netlify/functions
        const formData = new FormData(form);
        const pageHeight = formData.get('pageHeight');
        const pageWidth = formData.get('pageWidth');

        fetch(`${baseUrl}/api/dimensions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pageHeight, pageWidth })
        })
        .then(response => response.json())
        .then(data => {

            const aspectRatio = data.aspectRatio;
            const maxWidth = 400;
            const maxHeight = 400;

            let displayWidth, displayHeight;

            if (aspectRatio > 1) {
            displayWidth = maxWidth;
            displayHeight = maxWidth / aspectRatio;
            } else {
            displayHeight = maxHeight;
            displayWidth = maxHeight * aspectRatio;
            }

            const hFactor = displayHeight / pageHeight;
            console.log(hFactor)
            const wFactor = displayWidth / pageWidth;
            console.log(wFactor)

            createRectangle()
            createLineForms(hFactor, wFactor)

            document.getElementById('heightIndicator').innerHTML = `${pageHeight}mm`;
            document.getElementById('widthIndicator').innerHTML = `${pageWidth}mm`;
            
            const rectangle = document.getElementById('rectangle');
            rectangle.style.width = `${displayWidth}px`;
            rectangle.style.height = `${displayHeight}px`;
        })
        .catch(error => console.error('Error:', error));
    });
});

function createRectangle(){
    const mr = document.getElementById('mainRight');
    mr.innerHTML = '';
    
    const rh = document.createElement('div');
    rh.setAttribute('id', 'rectHeight');
    mr.appendChild(rh);
    
    const h  = document.createElement('p');
    h.setAttribute('id', 'heightIndicator');
    rh.appendChild(h);
    
    const rw  = document.createElement('div');
    rw.setAttribute('id', 'rectWidth');
    rh.appendChild(rw);
    
    const w  = document.createElement('p');
    w.setAttribute('id', 'widthIndicator');
    rw.appendChild(w);
    
    const r = document.createElement('div');
    r.setAttribute('id', 'rectangle');
    rw.appendChild(r);
}

function createLineForms(hFactor, wFactor){

    //Height line inputs
    const hl = document.getElementById('heightLines');
    hl.innerHTML = '';

    const hTitle = document.createElement('h3');
    hTitle.setAttribute('class', 'lineTitles');
    hTitle.innerHTML = 'Snijlijnen hoogte';
    hl.appendChild(hTitle);

    const hInfo = document.createElement('p');
    hInfo.setAttribute('class', 'lineInfo');
    hInfo.innerHTML = 'Hoogte in mm vanaf de bovenkant.';
    hl.appendChild(hInfo);

    const hli = document.createElement('div');
    hli.setAttribute('id', 'heightLinesInput');
    hl.appendChild(hli);

    newInput('height', hFactor);

    const hlAdd = document.createElement('button');
    hlAdd.setAttribute('onclick', 'newInput("height")');
    hlAdd.innerHTML = "&plus;";
    hl.appendChild(hlAdd);
    
    //Width line inputs
    const wl = document.getElementById('widthLines');
    wl.innerHTML = '';

    const wTitle = document.createElement('h3');
    wTitle.setAttribute('class', 'lineTitles');
    wTitle.innerHTML = 'Snijlijnen breedte';
    wl.appendChild(wTitle);

    const wInfo = document.createElement('p');
    wInfo.setAttribute('class', 'lineInfo');
    wInfo.innerHTML = 'Breedte in mm vanaf de bovenkant.';
    wl.appendChild(wInfo);

    const wli = document.createElement('div');
    wli.setAttribute('id', 'widthLinesInput');
    wl.appendChild(wli);

    newInput('width', wFactor);

    const wlAdd = document.createElement('button');
    wlAdd.setAttribute('onclick', 'newInput("width")');
    wlAdd.innerHTML = "&plus;";
    wl.appendChild(wlAdd);
}

function newInput(typeOfInput, factor){
    const amount = document.getElementById(`${typeOfInput}LinesInput`).childElementCount;
    const li = document.getElementById(`${typeOfInput}LinesInput`);

    const extraOption = document.createElement('div');
    extraOption.setAttribute('class', 'newLineOption');
    extraOption.setAttribute('id', `${typeOfInput}Option${amount}`);
    li.appendChild(extraOption);

    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.addEventListener('input', () => drawLine(typeOfInput, input.value, factor));
    extraOption.appendChild(input);
    
    const remove = document.createElement('button');
    remove.setAttribute('onclick', `removeOption("${typeOfInput}", ${amount})`);
    remove.innerHTML = `&#10006;`;
    extraOption.appendChild(remove);
}

function removeOption(typeOfInput, amount){
    const option = document.getElementById(`${typeOfInput}Option${amount}`);
    option.remove();
}

function drawLine(typeOfInput, value, factor){
    const rectangle = document.getElementById('rectangle');
    const rectHeight = rectangle.clientHeight;
    const rectWidth = rectangle.clientWidth;
    console.log(`Hr will be drawn on ${Math.round(value * factor)}`);

}