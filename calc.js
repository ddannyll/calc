const screen = document.querySelector('#calculator .screen')

let calc = {
    a: "",
    b: null,
    operator: null
}

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
            return null
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
    screen.innerText = str
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
                calc.a = result
                displayStr(calc.a)
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

displayStr('0')