let tempNumber = 0;
let tempOperator = '';
let numbers = [];
let operators = [];

function addOperator(operator) {
    if (operators.length === 0 && tempNumber === 0) return;
    numbers.push(parseFloat(tempNumber));
    tempNumber = 0;
    if (operator === '=') {
        evaluate();
        return;
    }
    tempOperator = operator;
}

function evaluate() {
    let result = parseFloat(numbers[0]);
    for (let i = 0; i < numbers.length; i++) {
        if (operators[i] === '+') {
            result += parseFloat(numbers[i + 1]);
        } else if (operators[i] === '-') {
            result -= parseFloat(numbers[i + 1]);
        } else if (operators[i] === '×') {
            result *= parseFloat(numbers[i + 1]);
        } else if (operators[i] === '÷') {
            result /= parseFloat(numbers[i + 1]);
        }
    }

    result = parseFloat(result).toFixed(9);
    result = (result * 1e9) / 1e9; // rounding
    while (result.toString().includes('.')) {
        if (result.toString().endsWith('0') || result.toString().endsWith('.')) {
            result = result.subString(0, result.length - 1);
        } else {
            break;
        }
    }
    tempNumber = result;
    update();
    return result;
}

function inputDecimal() {
    const display = document.querySelector('.calculator-screen');
    tempNumber += '.';
    display.value += '.';
}

function reset() {
    numbers = [];
    operators = [];
    tempNumber = 0;
    tempOperator = '';
}

function update() {
    const display = document.querySelector('.calculator-screen');
    display.value = tempNumber;
}

window.addEventListener("DOMContentLoaded", (event) => {
    const keys = document.querySelector('.calculator-keys');

    keys.addEventListener('click', (event) => {
        const {target} = event;

        if (!target.matches('button')) return;

        if (target.classList.contains('operator')) {
            addOperator(target.textContent);
            update();
            return;
        }

        if (target.classList.contains('decimal')) {
            inputDecimal();
            return;
        }

        if (target.classList.contains('clear')) {
            reset();
            update();
            return;
        }

        console.log(target.value);

        if (tempNumber === 0) {
            tempNumber = target.value;
        } else {
            tempNumber += target.value;
        }

        if (tempOperator != '') {
            operators.push(tempOperator);
        }
        update();
    });
});