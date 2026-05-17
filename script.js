const digitButtons = document.querySelectorAll('.digit');
const display = document.querySelector('.display');
const digitOperators = document.querySelectorAll('.operators');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');
const dotButton = document.querySelector('#dot');
const backspaceButton = document.querySelector('#backspace');

backspaceButton.addEventListener('click', () => {
    if (resultDisplayed) {
        return;
    }

    if (secondNumber !== '') {
        secondNumber = secondNumber.slice(0, -1);
        display.textContent = secondNumber || '0';
    }

    else if (operator !== '') {
        operator = '';
        display.textContent = firstNumber || '0';
    }

    else if (firstNumber !== '') {
        firstNumber = firstNumber.slice(0, -1);
        display.textContent = firstNumber || '0';
    }
    updateDotButton();
})

dotButton.addEventListener('click', () => {
    if (operator === '') {
        if (firstNumber.includes('.')) {
            return;
        }

        else if (firstNumber === '') {
            firstNumber = '0.';
        }

        else {
            firstNumber += '.';
        }

        display.textContent = firstNumber;
    }

    else {
        if (secondNumber.includes('.')) {
            return;
        }

        else if (secondNumber === '') {
            secondNumber = '0.';
        }

        else {
            secondNumber += '.';
        }

        display.textContent = secondNumber;
    }
    updateDotButton()
})

digitButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (resultDisplayed && operator === '') {
            firstNumber = '';
            resultDisplayed = false;
        }

        if (operator === '') {
            firstNumber += button.textContent;
            display.textContent = firstNumber;
        }
        else {
            secondNumber += button.textContent;
            display.textContent = secondNumber;
        }

        updateDotButton();
    })
})

digitOperators.forEach((button) => {
    button.addEventListener('click', () => {
        if (firstNumber === '') {
            return;
        }

        if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
            const result = operate(Number(firstNumber), operator, Number(secondNumber));
            const formattedResult = formatResult(result);
            display.textContent = formattedResult;

            if (formattedResult === "Nope!") {
                firstNumber = '';
            }
            else {
                firstNumber = formattedResult.toString();
            }

            secondNumber = '';
        }

        operator = button.textContent;

        updateDotButton();
    })
})

equalButton.addEventListener('click', () => {
    if (firstNumber === '' || operator === '' || secondNumber === '') {
        return;
    }

    const result = operate(Number(firstNumber), operator, Number(secondNumber));
    const formattedResult = formatResult(result);
    display.textContent = formattedResult;

    if (formattedResult === "Nope!") {
        firstNumber = '';
    }
    else {
        firstNumber = formattedResult.toString();
    }
    operator = '';
    secondNumber = '';
    resultDisplayed = true;

    updateDotButton();
})

clearButton.addEventListener('click', () => {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    resultDisplayed = false;
    display.textContent = "0";

    updateDotButton();
})

function updateDotButton() {
    if (operator === '') {
        dotButton.disabled = firstNumber.includes('.');
    }
    else {
        dotButton.disabled = secondNumber.includes('.');
    }
}

function formatResult(result) {
    if (result === "Nope!") {
        return result;
    }

    return Math.round(result * 1000) / 1000;
}

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
let resultDisplayed = false;

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

document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        const button = Array.from(digitButtons).find(
            (digitButton) => digitButton.textContent === event.key
        )
        button.click();
    }

    else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        const button = Array.from(digitOperators).find(
            (operatorButton) => operatorButton.textContent === event.key
        )
        button.click();
    }

    else if (event.key === '.') {
        dotButton.click();
    }

    else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        equalButton.click();
    }

    else if (event.key === "Backspace") {
        event.preventDefault();
        backspaceButton.click();
    }

    else if (event.key === "Escape") {
        clearButton.click();
    }
})

updateDotButton();