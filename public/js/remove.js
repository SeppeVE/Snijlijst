export function removeOption(typeOfInput, amount){
    const option = document.getElementById(`${typeOfInput}Option${amount}`);
    option.remove();
}
