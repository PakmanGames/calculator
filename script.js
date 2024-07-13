// To store values
const operation = {
    first: [],
    operator: null,
    second: [],
};

const display = document.querySelector(".display");

// Selects all the buttons and the embedded audio
const allButtons = document.querySelectorAll("button");
const click = document.querySelector("audio");

// Adds a sound effect when user clicks any button
for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("mousedown", () => {
        click.currentTime = 0;
        click.play();
        allButtons[i].classList.add("pressed");
    });

    allButtons[i].addEventListener("mouseup", () => {
        allButtons[i].classList.remove("pressed");
    })

    // To account for if user press and holds while leaving element area
    allButtons[i].addEventListener("mouseleave", () => {
        allButtons[i].classList.remove("pressed");
    })
}

// Number buttons on the left
const numberBtns = document.querySelectorAll(".numbers button");
const numberButtons = Array.from(numberBtns);

// Listener function for zero button
const zero = () => {
    if (display.classList.contains("first")) {
        // Changing the first value
        valueZeroCheck(operation.first);
    } else if (display.classList.contains("second")) {
        // Changing the second value
        valueZeroCheck(operation.second);
    }
}

// Listener function for decimal button
const decimal = () => {
    if (operation.operator === null && display.classList.contains("first")) {
        // Changing the first value
        valueDecimalCheck(operation.first);
    } else if (operation.operator !== null && display.classList.contains("second")) {
        // Changing the second value
        valueDecimalCheck(operation.second);
    }
}

// Listener function for equal button
const equals = () => {
    if (operation.first.length !== 0 && operation.operator !== null && operation.second.length !== 0) {
        // Only operates if there are two values and an operator
        display.textContent = lengthCheck(operate(operation));
        // Store previous operator incase user presses 'Del' after pressing '='
        const prevOperator = operation.operator;
        clear(operation);
        // Sets the answer as the first value in next operation
        operation.first = display.textContent.split("");
        operation.operator = prevOperator;
        display.classList.remove("first");
        display.classList.add("second");
    }
}

// Listener function for delete button
const del = () => {
    if (display.classList.contains("first")) {
        // Changing the first value
        deleteButton(operation.first);
    } else if (display.classList.contains("second")) {
        // Changing the second value
        deleteButton(operation.second);
    }
}

// Adds event listeners to each number based on which number it is
for (let i = 0; i < numberButtons.length; i++) {
    if (numberButtons[i].classList.contains("zero-btn") && numberButtons[i].textContent === "0") {
        // If the number button pressed is zero
        numberButtons[i].addEventListener("click", zero);
    } else if (numberButtons[i].classList.contains("decimal-btn") && numberButtons[i].textContent === ".") {
        // If the number button pressed is the decimal button
        numberButtons[i].addEventListener("click", decimal);
    } else {
        numberButtons[i].addEventListener("click", () => {
            if (operation.operator === null && display.classList.contains("first")) {
                // Changing the first value
                if (operation.first[0] === 0 && operation.first[1] !== ".") {
                    // Removes 0 in front of number after user presses `Del` then a number
                    operation.first.forEach(item => item === 0 ? operation.first.shift() : item);
                }
                operation.first.push(numberButtons[i].textContent);
                display.textContent = lengthCheck(operation.first.join(""));
            } else if (operation.operator !== null && display.classList.contains("second")) {
                // Changing the second value
                if (operation.second[0] === 0 && operation.second[1] !== ".") {
                    // Removes 0 in front of number after user presses `Del` after an operator
                    operation.second.forEach(item => item === 0 ? operation.second.shift() : item);
                }
                operation.second.push(numberButtons[i].textContent);
                display.textContent = lengthCheck(operation.second.join(""));
            }
        });
    }
}

// Operator buttons on the right
const operatorBtns = document.querySelectorAll(".operators button");
const operatorButtons = Array.from(operatorBtns);

// Adds event listeners to each operator based on what operator it is
for (let i = 0; i < operatorButtons.length; i++) {
    if (operatorButtons[i].textContent === "=") {
        // User presses `=`
        operatorButtons[i].addEventListener("click", equals)
    } else if (operatorButtons[i].textContent === "AC") {
        // User presses `AC`
        operatorButtons[i].addEventListener("click", () => {
            // Clean reset to starting values
            clear(operation);
            display.classList.remove("second");
            if (! display.classList.contains("first")) {
                display.classList.add("first");
            }
            display.textContent = "0";
        });
    } else if (operatorButtons[i].textContent === "Del") {
        // User presses `Del`
        operatorButtons[i].addEventListener("click", del)
    } else { // The regular operators 'x', '/', '+', '-'
        operatorButtons[i].addEventListener("click", () => {
            if (operation.first.length === 0) {
                // Sets the first value to be 0 if user immediately presses an operator
                operation.first.push(0);
                operation.operator = operatorButtons[i].textContent;
                display.classList.remove("first");
                display.classList.add("second");
            } else if (operation.second.length !== 0) {
                // Performs operation if second value doesn't have length of 0
                display.textContent = lengthCheck(operate(operation));
                clear(operation);
                operation.first = display.textContent.split("");
                // Sets up for user to enter second value
                operation.operator = operatorButtons[i].textContent;
                display.classList.remove("first");
                display.classList.add("second");
            } else {
                // Otherwise just setup for user to enter second value
                operation.operator = operatorButtons[i].textContent;
                display.classList.remove("first");
                display.classList.add("second");
            }
        });
    }
    
}

// Checks value of certain conditions when user presses `0` to handle complications before they arise
function valueZeroCheck(numbers) {
    if (numbers.length !== 0 && numbers[0] !== 0 && numbers[1] !== ".") {
        // If the value doesn't start with `0` and `.`
        numbers.push(0);
    } else if (numbers[1] !== ".") {
        // If user spams `0` when its already the value
        numbers = [0];
    } else {
        numbers.push(0);
    }
    display.textContent = lengthCheck(numbers.join(""));
}

// Checks value of certain conditions when user presses `.` to handle complications before they arise
function valueDecimalCheck(numbers) {
    if (numbers.length === 0) {
        // If the value is empty and user presses decimal first: add zero before decimal
        numbers.push(0, ".");
    } else if (! numbers.some(item => item === "." ? true : false)) {
        // Check if the value already has a decimal
        numbers.push(".");
    }
    display.textContent = lengthCheck(numbers.join(""));
}

// Deletes the last digit of the value
function deleteButton(numbers) {
    numbers.pop();
    if (numbers.length === 0) {
        numbers.push(0);
    }
    display.textContent = lengthCheck(numbers.join(""));
}

// CLears any values of operation
function clear(operation) {
    operation.first = [];
    operation.operator = null;
    operation.second = [];
}

function add(a, b) {
    return round(a + b);
}

function subtract(a, b) {
    return round(a - b);
}

function multiply(a, b) {
    return round(a * b);
}

function divide(a, b) {
    if (b === 0)
        return NaN;
    return round(lengthCheck(a / b));
}

// Rounds number to properly handle floats
function round(num) {
    return Math.round(num * 10**10) / 10 **10;
}

// Performs the calculation
function operate(operation) {
    first = Number(operation.first.join(""));
    second = Number(operation.second.join(""));
    if (operation.operator === "+") {
        return add(first, second);
    } else if (operation.operator === "-") {
        return subtract(first, second);
    } else if (operation.operator === "x" || operation.operator === "*") {
        return multiply(first, second);
    } else if (operation.operator === "/") {
        return divide(first, second);
    }
}

// Keeps number within 11 characters to fit on display screen
function lengthCheck(num) {
    const arr = String(num).split("");
    if (arr.length > 11) {
        if (num = arr.some(item => item === "e" ? true : false)) {
            // If number is larger than 21 digits (scientific notation)
            // Array starting from `e`
            const end = arr.slice(arr.indexOf("e"));
            // Format num so it's got room for end
            num = arr.slice(0, 11 - end.length);
            // Push each item in end to num
            end.map((item) => num.push(item));
            return num.join("");
        }
        return arr.slice(0, 11).join("")
    }
    return num;
}

// Keyboard support
window.addEventListener("keydown", (e) => {
    // Prevents default behavior incase a button is in focus and user presses `Enter`
    e.preventDefault();

    const acceptedKeys = ["0", ".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "=", 
        "Enter", "Backspace", "+", "-", "/", "*"];

    if (acceptedKeys.some(item => item === e.key ? true : false)) {
        // Checks if the key pressed is accepted to play sound and perform animation
        let pressedKey = Array.from(document.querySelectorAll("button")).find(item => item.textContent === e.key)
        click.currentTime = 0;
        click.play();
        // Incase pressedKey is null or undefined due to the key pressed
        if (e.key === "Backspace") {
            pressedKey = document.querySelector(".del-btn");
        } else if (e.key === "Enter") {
            pressedKey = document.querySelector(".equal-btn");
        } else if (e.key === "*") {
            pressedKey = document.querySelector(".mult-btn");
        }
        pressedKey.classList.add("pressed");

        // Event listener for when the key is released
        window.addEventListener("keyup", (event) => {
            pressedKey.classList.remove("pressed");
        })
    }

    // Performs the correct action based on the key that was pressed much similar to event listeners above
    if (e.key === "0") {
        zero();
    } else if (e.key === ".") {
        decimal();
    } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].some(item => item === e.key ? true : false)) {
        if (operation.operator === null && display.classList.contains("first")) {
            // Changing the first value
            if (operation.first[0] === 0 && operation.first[1] !== ".") {
                // Removes 0 in front of number after user presses `Del` then a number
                operation.first.forEach(item => item === 0 ? operation.first.shift() : item);
            }
            operation.first.push(e.key);
            display.textContent = lengthCheck(operation.first.join(""));
        } else if (operation.operator !== null && display.classList.contains("second")) {
            // Changing the second value
            if (operation.second[0] === 0 && operation.second[1] !== ".") {
                // Removes 0 in front of number after user presses `Del` after an operator
                operation.second.forEach(item => item === 0 ? operation.second.shift() : item);
            }
            operation.second.push(e.key);
            display.textContent = lengthCheck(operation.second.join(""));
        }
    } else if (e.key === "=" || e.key === "Enter") {
        equals();
    } else if (e.key === "Backspace") {
        del();
    } else if (["+", "-", "/", "*"].some(item => item === e.key ? true : false)) {
        if (operation.first.length === 0) {
            // Sets the first value to be 0 if user immediately presses an operator
            operation.first.push(0);
            operation.operator = e.key;
            display.classList.remove("first");
            display.classList.add("second");
        } else if (operation.second.length !== 0) {
            // Performs operation if second value doesn't have length of 0
            display.textContent = lengthCheck(operate(operation));
            clear(operation);
            operation.first = display.textContent.split("");
            // Sets up for user to enter second value
            operation.operator = e.key;
            display.classList.remove("first");
            display.classList.add("second");
        } else {
            // Otherwise just setup for user to enter second value
            operation.operator = e.key;
            display.classList.remove("first");
            display.classList.add("second");
        }
    }
});