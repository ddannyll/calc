const screen = document.querySelector('#calculator .screen')
const MAX_DIGIT = 8
let calc = {
    a: "",
    b: null,
    operator: null,
    end: false
}

// --- Basic Calculation Functions ---
function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b == 0) return null
    return a / b
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "*":
            return multiply(a, b)
        case "/":
            return divide(a, b)
        default:
            return a
    }
}   


// --- Calc Object Interaction Functions

function resetCalc() {
    calc = {
        a: "",
        b: null,
        operator: null,
        end: false
    }
}
function evaluateCalc() {
    let result = operate(calc.operator, +calc.a, +calc.b)
    resetCalc()
    calc.a = String(result)
    calc.end = true
    displayCalc()
}

function processOperand(button) {
    function appendNum(curr, num) {
        (curr === null) ? curr = num : curr += num
        return curr
    }

    if (calc.operator === null) {
        // Editing the first number (before operator)
        if (calc.end) {
            // If an equal sign has just been pressed before, 
            // start a new calculation
            calc.a = ''
            calc.end = false
        }
        calc.a = appendNum(calc.a, button.target.value);
    } else {
        // Editing the second number (after operator)
        calc.b = appendNum(calc.b, button.target.value)
    }
    displayCalc()
}

function processOperator(button) {
    console.log(calc)
    if (calc.b !== null) { 
        // Continuing a calculation (i.e. 5 + 6 + ...)
        evaluateCalc()
    }
    calc.operator = button.target.value
}

function deleteCalc() {
    (calc.b === null) ? 
        calc.a = calc.a.slice(0, -1) : 
        calc.b = calc.b.slice(0, -1)
    displayCalc()
}


// --- Displaying Functions to Calculator Screen ---
function displayCalc() {
    if (calc.b === null) {
        // We are editing the first operand, dislay it
        displayStr(calc.a)
    } else {
        displayStr(calc.b)
    }
}

function displayStr(str) {
    if (str.length > MAX_DIGIT) {
        str = truncateStr(str, MAX_DIGIT)
    }
    screen.innerText = str
}

function truncateStr(str, maxLength) {
    function hasDot(str) { return (str.indexOf('.') !== -1) }
    function tooLong(str, maxLength) { return str.length > maxLength }

    // attempt to truncate by removing characters past decimal
    while ((hasDot(str) && tooLong(str, maxLength)) || str.endsWith('.')) {
        str = str.slice(0, -1)
    }
    return str
}


// --- Event Listeners --- 
const buttons = document.querySelectorAll(".button-grid button")
buttons.forEach((button) => {
    switch (button.className) {
        case 'operator':
            button.onclick = processOperator
            break
        case 'operand':
            button.onclick = processOperand
            break
        case 'equals':
            button.onclick = evaluateCalc
            break
        case 'clear':
            button.onclick = () => {
                resetCalc()
                displayStr('0')
            }
            break
        case 'delete':
            button.onclick = deleteCalc
            break
        case 'decimal':
            button.onclick = insertDecimal
            break
        case 'sign':
            button.onclick = toggleSign
            break
        default:
            return null
    }
})

function toggleSign() {
    function getOppositeSignString(str) {
        (str[0] === '-') ?
            str = str.slice(1) :
            str =  '-' + str
        return str
    }
    (calc.b === null) ?
        calc.a = getOppositeSignString(calc.a) :
        calc.b = getOppositeSignString(calc.b)
    displayCalc()
}

function insertDecimal() {
    function getInsertedDecimalStr(str) {
        if (str.indexOf('.') !== -1) return str
        return str += '.'
    }

    (calc.b === null) ?
        calc.a = getInsertedDecimalStr(calc.a) :
        calc.b = getInsertedDecimalStr(calc.b)
    displayCalc()
}



resetCalc()
displayStr('0')
