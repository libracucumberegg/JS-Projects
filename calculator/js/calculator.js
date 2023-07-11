let tempNumber = 0.0;
let tempOperator = '';
let numbers = [];
let operators = [];

function addOperator(operator) {
    if (operators.length === 0 && tempNumber === 0) return;
    numbers.push(parseFloat(tempNumber));
    tempNumber = 0.0;
    if (operator === '=') {
        evaluate();
        return;
    }
    tempOperator = operator; // save operator to be pushed later in case the user inputted the wrong one
}

function evaluate() {
    let result = parseFloat(numbers[0]);
    for (let i = 0; i < numbers.length - 1; i++) { // - 1 because first number is already set
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

    result = parseFloat(result).toFixed(9); // cutting to 9 decimal places
    result = (result * 1e9) / 1e9; // rounding to 9 decimal places
    while (result.toString().includes('.')) {
        if (result.toString().endsWith('0') || result.toString().endsWith('.')) { // prevent trailing zeroes
            result = result.subString(0, result.length - 1); // remove said trailing zeros
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

window.addEventListener("DOMContentLoaded", (event) => { // wait for DOM to load to prevent errors
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

    document.addEventListener("keydown", (event) => {
        const keyName = event.key;

        if (typeof(keyName) != 'string') return; // prevent special keys

        if (keyName === 'Shift') {
            return; // probably pressing an operator
        }

        if (keyName === 'Home' || keyName === 'End' || keyName === 'Escape') {
            reset();
            update();
            return;
        }

        if (keyName === 'Backspace' || keyName === 'Delete') {
            if (tempNumber === 0 || tempNumber === null) return;
            tempNumber = tempNumber.substring(0, tempNumber.length - 1);
            update();
            return;
        }

        if (keyName === 'Enter' || keyName === '=') {
            if (tempNumber === 0) return;
            addOperator('=');
            return;
        }

        if (keyName === '.') {
            inputDecimal();
            return;
        }

        if (keyName === '+' || keyName === '-' || keyName === '*' || keyName === '/') {
            let fixedOp = keyName === '*' ? '×' : keyName === '/' ? '÷' : keyName; // change to make it work with evaluate()
            addOperator(fixedOp);
            update();
            return;
        }

        if (!isNaN(parseFloat(keyName))) { // prevent non-numeric keys
            if (tempNumber === 0) {
                tempNumber = parseFloat(keyName);
            } else {
                tempNumber += keyName;
            }

            if (tempOperator != '') {
                operators.push(tempOperator);
            }
            update();
        }
    }, false);
});