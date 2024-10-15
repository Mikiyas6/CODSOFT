"use strict";

const buttons = document.querySelectorAll(".btn");
const resultDisplay = document.querySelector(".result");

let expression = "";
let shouldResetScreen = false;

function updateScreen(value) {
  resultDisplay.textContent = value;
}

function clear() {
  expression = "0";
  updateScreen(expression);
  shouldResetScreen = false;
}

function appendToExpression(value) {
  if (shouldResetScreen) {
    expression = value;
    shouldResetScreen = false;
  } else {
    if (expression === "0") {
      expression = value;
    } else {
      expression += value;
    }
  }
  updateScreen(expression);
}

function computeExpression() {
  try {
    const result = eval(expression);
    updateScreen(result);
    expression = result.toString();
  } catch (error) {
    updateScreen("Error");
    expression = "";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;

    if (value === "clear") {
      clear();
    } else if (value === "toggle") {
      expression = (parseFloat(expression) * -1).toString();
      updateScreen(expression);
    } else if (value === "%") {
      expression = (parseFloat(expression) / 100).toString();
      updateScreen(expression);
    } else if (value === "=") {
      computeExpression();
    } else {
      appendToExpression(value);
    }
  });
});

clear();
