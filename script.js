const digitButtons = document.querySelectorAll('.digit');
const display = document.querySelector('.display');

digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        firstNumber += button.textContent;
        display.textContent = firstNumber;
    })
})


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNumber = '';
let operator = '';
let secondNumber = '';

function operate(firstNumber, operator, secondNumber) {
    if (operator === '+') {
        return add(firstNumber, secondNumber);
    }
    else if (operator === '-') {
        return subtract(firstNumber, secondNumber);
    }
    else if (operator === '*') {
        return multiply(firstNumber, secondNumber);
    }
    else if (operator === '/') {
        return divide(firstNumber, secondNumber);
    }
}