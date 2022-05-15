const screen = document.querySelector('#calculator .screen')
const MAX_DIGIT = 8


let calc = {}

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

function resetCalc() {
    calc = {
        a: "",
        b: null,
        operator: null
    }
}

function appendNum(curr, num) {
    (curr === null) ? curr = num : curr += num
    return curr
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

const buttons = document.querySelectorAll(".button-grid button")

buttons.forEach((button) => {
    switch (button.className) {
        case 'operator':
            button.onclick = () => {
                calc.operator = button.value
                calc.b = null
            }
            break
        case 'operand':
            button.onclick = () => {
                if (calc.operator === null) {
                    calc.a = appendNum(calc.a, button.value);
                    displayStr(calc.a)
                } else {
                    calc.b = appendNum(calc.b, button.value)
                    displayStr(calc.b)
                }
            }
            break
        case 'equals':
            button.onclick = () => {
                result = operate(calc.operator, +calc.a, +calc.b)
                resetCalc()
                calc.a = result
                displayStr(result)
            }
            break
        case 'clear':
            button.onclick = () => {
                resetCalc()
                displayStr('0')
            }
            break
        default:
            return null
    }
})

resetCalc()
displayStr('0')
