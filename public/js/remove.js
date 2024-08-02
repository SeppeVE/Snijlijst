export function removeOption(typeOfInput, amount){
    const option = document.getElementById(`${typeOfInput}Option${amount}`);
    const line = document.getElementById(`${typeOfInput}Line${amount}`);
    option.remove();
    line.remove();
}
