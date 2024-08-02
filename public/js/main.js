import './init.js';
import { createRectangle, createLineForms } from './create.js';
import { removeOption } from './remove.js';
import { newInput, drawLine } from './update.js';
import { calculate } from './list.js';

// Export functions if needed
export {
    createRectangle,
    createLineForms,
    removeOption,
    newInput,
    drawLine,
    calculate
};

window.newInput = newInput;
window.removeOption = removeOption;
window.calculate = calculate;