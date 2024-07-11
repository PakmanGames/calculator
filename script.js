// To store values
const operation = {
    first: [],
    operator: null,
    second: [],
};

const display = document.querySelector(".display");

// Number buttons on the left
const numberBtns = document.querySelectorAll(".numbers button");
const numberButtons = Array.from(numberBtns);

// Adds event listeners to each number based on which number it is
for (let i = 0; i < numberButtons.length; i++) {
    if (numberButtons[i].classList.contains("zero-btn") || numberButtons[i].classList.contains("decimal-btn")) {
        if (numberButtons[i].textContent === "0") {
            numberButtons[i].addEventListener("click", () => {
                console.log(numberButtons[i].textContent);
                if (display.classList.contains("first")) {
                    if (operation.first.length !== 0 && operation.first[0] !== 0 && operation.first[1] !== ".") {
                        operation.first.push(0);
                        display.textContent = lengthCheck(operation.first.join(""));
                    } else if (operation.first[1] !== ".") {
                        operation.first = [0];
                        display.textContent = lengthCheck(operation.first.join(""));
                    } else {
                        operation.second.push(0);
                        display.textContent = lengthCheck(operation.first.join(""));
                    }
                } else if (display.classList.contains("second")) {
                    if (operation.second.length !== 0 && operation.second[0] !== 0 && operation.second[1] !== ".") {
                        operation.second.push(0);
                        display.textContent = lengthCheck(operation.second.join(""));
                    } else if (operation.second[1] !== ".") {
                        operation.second = [0];
                        display.textContent = lengthCheck(operation.second.join(""));
                    } else {
                        operation.second.push(0);
                        display.textContent = lengthCheck(operation.second.join(""));
                    }
                }
            });
        } else if (numberButtons[i].textContent === ".") {
            numberButtons[i].addEventListener("click", () => {
                console.log(numberButtons[i].textContent);
                if (operation.operator === null && display.classList.contains("first") && operation.first.length === 0) {
                    operation.first.push(0, ".");
                    display.textContent = operation.first.join("");
                } else if (operation.operator === null && display.classList.contains("first")) {
                    if (! operation.first.some(item => item === "." ? true : false)) {
                        operation.first.push(".");
                        display.textContent = operation.first.join("");
                    }
                } else if (operation.operator !== null && display.classList.contains("second")) {
                    if (operation.second.length === 0) {
                        operation.second.push(0, ".");
                        display.textContent = operation.second.join("");
                    } else if (! operation.second.some(item => item === "." ? true : false)) {
                        operation.second.push(".");
                        display.textContent = operation.second.join("");
                    }
                }
            });
        }
    } else {
        numberButtons[i].addEventListener("click", () => {
            console.log(numberButtons[i].textContent);
            if (operation.operator === null && display.classList.contains("first")) {
                operation.first.push(numberButtons[i].textContent);
                display.textContent = operation.first.join("");
            } else if (operation.operator !== null && display.classList.contains("second")) {
                // If user presses delete after they press an operator
                if (operation.second[0] === 0 && operation.second[1] !== ".") {
                    operation.second.forEach(item => item === 0 ? operation.second.shift() : item);
                }
                operation.second.push(numberButtons[i].textContent);
                display.textContent = lengthCheck(operation.second.join(""));
                console.log(operation);
            }
        });
    }
}

// Operator buttons on the right
const operatorBtns = document.querySelectorAll(".operators button");
const operatorButtons = Array.from(operatorBtns);

// Adds event listeners to each operator based on what operator it is
for (let i = 0; i < operatorButtons.length; i++) {
    if (operatorButtons[i].classList.contains("del-btn") || 
        operatorButtons[i].classList.contains("clear-btn") || 
        operatorButtons[i].classList.contains("equal-btn")) {
        if (operatorButtons[i].textContent === "=") {
            operatorButtons[i].addEventListener("click", () => {
                if (operation.first.length !== 0 && operation.operator !== null && operation.second.length !== 0) {
                    display.textContent = lengthCheck(operate(operation));
                    // Store previous operator incase user presses 'Del' after pressing '='
                    const prevOperator = operation.operator;
                    clear(operation);
                    operation.first = display.textContent.split("");
                    operation.operator = prevOperator;
                    display.classList.remove("first");
                    display.classList.add("second");
                    console.log(operation); // FOR TESTING
                }
            })
        } else if (operatorButtons[i].textContent === "AC") {
            operatorButtons[i].addEventListener("click", () => {
                clear(operation);
                display.classList.remove("second");
                if (! display.classList.contains("first")) {
                    display.classList.add("first");
                }
                display.textContent = "0";
                console.log(operation); // FOR TESTING
            });
        } else if (operatorButtons[i].textContent === "Del") {
            operatorButtons[i].addEventListener("click", () => {
                if (display.classList.contains("first")) {
                    operation.first.pop();
                    if (operation.first.length === 0) {
                        operation.first.push(0);
                    }
                    display.textContent = operation.first.join("");
                } else if (display.classList.contains("second")) {
                    operation.second.pop();
                    if (operation.second.length === 0) {
                        operation.second.push(0);
                    }
                    display.textContent = operation.second.join("");
                }
            })
        }
    } else { // The regular operators 'x', '/', '+', '-'
        operatorButtons[i].addEventListener("click", () => {
            if (operation.first.length === 0) {
                // Sets the first value to be 0 if user immediately presses an operator
                operation.first.push(0);
                operation.operator = operatorButtons[i].textContent;
                display.classList.remove("first");
                display.classList.add("second");
                console.log(operation); // FOR TESTING
            } else if (operation.second.length !== 0) {
                // Performs operation if second value doesn't have length of 0
                display.textContent = lengthCheck(operate(operation));
                clear(operation);
                operation.first = display.textContent.split("");
                // Sets up for user to enter second value
                operation.operator = operatorButtons[i].textContent;
                display.classList.remove("first");
                display.classList.add("second");
                console.log(operation); // FOR TESTING
            } else {
                // Otherwise just setup for user to enter second value
                operation.operator = operatorButtons[i].textContent;
                display.classList.remove("first");
                display.classList.add("second");
                console.log(operation); // FOR TESTING
            }
        });
    }
}

// CLears any values of operation
function clear(operation) {
    operation.first = [];
    operation.operator = null;
    operation.second = [];
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
    return lengthCheck(a / b);
}

// Performs the calculation
function operate(operation) {
    first = Number(operation.first.join(""));
    second = Number(operation.second.join(""));
    if (operation.operator === "+") {
        return add(first, second);
    } else if (operation.operator === "-") {
        return subtract(first, second);
    } else if (operation.operator === "x") {
        return multiply(first, second);
    } else if (operation.operator === "/") {
        return divide(first, second);
    }
}

// Keeps number within 11 characters to fit on display screen
function lengthCheck(num) {
    if (String(num).split("").length > 11) {
        return num = String(num).split("").slice(0, 11).join("");
    }
    return num;
}