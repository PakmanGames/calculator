const operation = {};
const numberBtns = document.querySelectorAll(".numbers button");
const numberButtons = Array.from(numberBtns);

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", () => {
        console.log(numberButtons[i].textContent);
    });
}

const operatorBtns = document.querySelectorAll(".operators button");
const operatorButtons = Array.from(operatorBtns);

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener("click", () => {
        console.log(operatorButtons[i].textContent);
    });
}

const del = document.querySelector("#del-btn");
const clear = document.querySelector("#clear-btn");
const equal = document.querySelector("#equal-btn");

del.addEventListener("click", () => {
    console.log(del.textContent);
});

clear.addEventListener("click", () => {
    console.log(clear.textContent);
});

equal.addEventListener("click", () => {
    console.log(equal.textContent);
});

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