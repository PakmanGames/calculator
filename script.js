const operation = {};
const btns = document.querySelectorAll("button");
const buttons = Array.from(btns);
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        console.log(buttons[i].textContent);
    });
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
    if (b === 0)
        return NaN;
    return a / b;
}

function operate(operation) {
    if (operation.operator === "+") {
        return add(operation.first, operation.second);
    } else if (operation.operator === "-") {
        return subtract(operation.first, operation.second);
    } else if (operation.operator === "*") {
        return multiply(operation.first, operation.second);
    } else if (operation.operator === "/") {
        return divide(operation.first, operation.second);
    }
}