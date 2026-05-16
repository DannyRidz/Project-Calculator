const digitButtons = document.querySelectorAll('.digit');
const display = document.querySelector('.display');
const digitOperators = document.querySelectorAll('.operators');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');

digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator === '') {
            firstNumber += button.textContent;
            display.textContent = firstNumber;
        }
        else {
            secondNumber += button.textContent;
            display.textContent = secondNumber;
        }
    })
})

digitOperators.forEach((button) => {
    button.addEventListener('click', () => {
        operator = button.textContent;
    })
})


equalButton.addEventListener('click', () => {
    const result = operate(Number(firstNumber), operator, Number(secondNumber));
    display.textContent = result;

    if (result === "Nope!") {
        firstNumber = '';
    }
    else {
        firstNumber = result.toString();
    }
    operator = '';
    secondNumber = '';
})

clearButton.addEventListener('click', () => {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    display.textContent = "0";
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
    if (b === 0) {
        return "Nope!"
    }
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