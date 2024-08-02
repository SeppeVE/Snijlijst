import { newInput } from './update.js';

export function createRectangle(){
    const mr = document.getElementById('mainRight');
    mr.innerHTML = '';
    
    const rh = document.createElement('div');
    rh.setAttribute('id', 'rectHeight');
    mr.appendChild(rh);
    
    const h = document.createElement('p');
    h.setAttribute('id', 'heightIndicator');
    rh.appendChild(h);
    
    const rw = document.createElement('div');
    rw.setAttribute('id', 'rectWidth');
    rh.appendChild(rw);
    
    const w = document.createElement('p');
    w.setAttribute('id', 'widthIndicator');
    rw.appendChild(w);
    
    const r = document.createElementNS('http://www.w3.org/2000/svg','svg');
    r.setAttribute('id', 'rectangle');
    rw.appendChild(r);
}

export function createLineForms(hFactor, wFactor){
    document.getElementById('inputContainer').style = "display: flex";

    // Height line inputs
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
    hlAdd.setAttribute('onclick', `newInput("height", ${hFactor})`);
    hlAdd.setAttribute('class', 'addButtons');
    hlAdd.innerHTML = "&plus;";
    hl.appendChild(hlAdd);
    
    // Width line inputs
    const wl = document.getElementById('widthLines');
    wl.innerHTML = '';

    const wTitle = document.createElement('h3');
    wTitle.setAttribute('class', 'lineTitles');
    wTitle.innerHTML = 'Snijlijnen breedte';
    wl.appendChild(wTitle);

    const wInfo = document.createElement('p');
    wInfo.setAttribute('class', 'lineInfo');
    wInfo.innerHTML = 'Breedte in mm vanaf de zijkant.';
    wl.appendChild(wInfo);

    const wli = document.createElement('div');
    wli.setAttribute('id', 'widthLinesInput');
    wl.appendChild(wli);

    newInput('width', wFactor);

    const wlAdd = document.createElement('button');
    wlAdd.setAttribute('onclick', `newInput("width", ${wFactor})`);
    wlAdd.setAttribute('class', 'addButtons');
    wlAdd.innerHTML = "&plus;";
    wl.appendChild(wlAdd);

    const calculateButton = document.getElementById('calculateList');
    calculateButton.style.display = "block";
}