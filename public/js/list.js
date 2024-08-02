export function calculate() {
    document.getElementById('inputHighError').style.display = "none";
    let amountOfHeightLines = document.getElementById("heightLinesInput").childElementCount;
    let amountOfWidthLines = document.getElementById("widthLinesInput").childElementCount;
    const originalHeight = parseInt(document.getElementById('pageHeight').value);
    const originalWidth = parseInt(document.getElementById('pageWidth').value);

    let heightValues = getValues("height", amountOfHeightLines, originalHeight);
    let widthValues = getValues("width", amountOfWidthLines, originalWidth);

    if (heightValues.length < 2 || widthValues.length < 2) {
        document.getElementById('inputLowError').style.display = "block";
        return; // Exit the function early if there are not enough lines
    }

    document.getElementById('inputLowError').style.display = "none";

    let instructions = cuttingList(heightValues.sort((a, b) => a - b), widthValues.sort((a, b) => a - b), originalHeight, originalWidth);
    
    let mainRight = document.getElementById('mainRight');
    let ic = document.getElementById('instructionsContainer');

    if (ic != null) {
        ic.remove();
    }

    let instructionsContainer = document.createElement('div');
    instructionsContainer.setAttribute('id', 'instructionsContainer');
    mainRight.appendChild(instructionsContainer);

    let instructionsTitle = document.createElement('h3');
    instructionsTitle.setAttribute('class', 'lineTitles');
    instructionsTitle.innerHTML = 'Instructies';
    instructionsContainer.appendChild(instructionsTitle);

    for (let i = 0; i < instructions.length; i++) {
        let nextStep = document.createElement('p');
        nextStep.setAttribute('class', 'instructions');
        nextStep.innerHTML = `${instructions[i].Instruction} ${instructions[i].Measurement}mm`;
        instructionsContainer.appendChild(nextStep);
    }
}

export function getValues(typeOfInput, amount, original) {
    let values = [];
    for (let i = 0; i < amount; i++) {
        let inputValue = document.getElementById(`${typeOfInput}Input${i}`).value;
        let parsedValue = parseInt(inputValue);

        if (inputValue !== "" && !isNaN(parsedValue)) {
            if (parsedValue > original) {
                document.getElementById('inputHighError').style.display = "block";
            } else {
                values.push(parsedValue);
            }
        }
    }
    return values;
}

export function cuttingList(heightValues, widthValues, originalHeight, originalWidth) {
    let instructions = [];

    // Make sure there are at least two height and width values
    if (heightValues.length < 2 || widthValues.length < 2) {
        document.getElementById('inputLowError').style.display = "block";
        return instructions; // Return an empty array if conditions are not met
    }

    document.getElementById('inputLowError').style.display = "none";

    // Add border cutting instructions
    instructions.push({ "Instruction": "Leg het blad zoals op de afbeelding en snijd op:", "Measurement": `${heightValues[heightValues.length - 1]}` });
    instructions.push({ "Instruction": "Draai het blad een kwartslag naar rechts en snijd op:", "Measurement": `${widthValues[widthValues.length - 1]}` });
    instructions.push({ "Instruction": "Draai het blad een kwartslag naar rechts en snijd op:", "Measurement": `${heightValues[heightValues.length - 1] - heightValues[0]}` });
    instructions.push({ "Instruction": "Draai het blad een kwartslag naar rechts en snijd op:", "Measurement": `${widthValues[widthValues.length - 1] - widthValues[0]}` });

    // Calculate borderless values
    let borderlessWidthValues = widthValues.map(value => value - widthValues[0]).slice(1, -1);
    let borderlessHeightValues = heightValues.map(value => value - heightValues[0]).slice(1, -1);

    borderlessHeightValues.sort((a, b) => b - a); // Sort descending

    let newHeight = originalHeight - (heightValues[0] + (originalHeight - heightValues[heightValues.length - 1]));
    let newWidth = originalWidth - (widthValues[0] + (originalWidth - widthValues[widthValues.length - 1]));

    for (let i = 0; i < borderlessWidthValues.length; i++) {
        newWidth -= borderlessWidthValues[i];
        instructions.push({ "Instruction": "Laat het blad op dezelfde breedte kant liggen en snijd op:", "Measurement": `${newWidth}` });

        // Update remaining borderlessWidthValues
        for (let j = i + 1; j < borderlessWidthValues.length; j++) {
            borderlessWidthValues[j] -= borderlessWidthValues[i];
        }
    }

    for (let i = 0; i < borderlessHeightValues.length; i++) {
        instructions.push({ "Instruction": "Laat het blad op dezelfde hoogte kant liggen en snijd op:", "Measurement": `${borderlessHeightValues[i]}` });
    }

    const targetInstruction = "Laat het blad op dezelfde hoogte kant liggen en snijd op:";
    const item = instructions.find(instruction => instruction.Instruction === targetInstruction);
    if (item) {
        item.Instruction = "Draai het blad een kwartslag naar rechts en snijd op:";
    }

    return instructions;
}
