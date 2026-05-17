const digitButtons = document.querySelectorAll('.digit');
const display = document.querySelector('.display');
const digitOperators = document.querySelectorAll('.operators');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');
const dotButton = document.querySelector('#dot');

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
})



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
})

function formatResult(result) {
    if (result === "Nope!") {
        return result;
    }

    return Math.round(result * 1000) / 1000;
}

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