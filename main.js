'use strict';

class Calculator {
  constructor(outputPreviousEl, outputCurrentEl) {
    this.outputPreviousEl = outputPreviousEl;
    this.outputCurrentEl = outputCurrentEl;
    this.clear();
  }

  clear() {
    this.outputPrevious = '';
    this.outputCurrent = '';
    this.operation = '';
  }

  del() {
    this.outputCurrent = String(this.outputCurrent).slice(0, -1);
  }

  appendNum(num) {
    if (num === '.' && this.outputCurrent.includes('.')) return;
    this.outputCurrent = String(this.outputCurrent) + String(num);
  }

  chooseOperation(operation) {
    if (!this.outputCurrent) return;
    if (this.outputPrevious !== '') {
      this.compute();
    }
    this.operation = operation;
    this.outputPrevious = this.outputCurrent;
    this.outputCurrent = '';
  }

  compute() {
    let result;
    const prev = parseFloat(this.outputPrevious);
    const cur = parseFloat(this.outputCurrent);
    if (!this.outputCurrent || !this.outputPrevious) return;

    switch (this.operation) {
      case '+':
        result = prev + cur;
        break;
      case '-':
        result = prev - cur;
        break;
      case '×':
        result = prev * cur;
        break;
      case '÷':
        result = prev / cur;
        break;
      default:
        return;
    }

    this.outputCurrent = result;
    this.operation = undefined;
    this.outputPrevious = '';
  }

  updateDisplay() {
    this.outputCurrentEl.innerText = this.outputCurrent;
    this.outputPreviousEl.innerText = this.outputPrevious;
  }
}

// Buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-clear]');
const delButton = document.querySelector('[data-delete]');
const eqButton = document.querySelector('[data-equals]');

const outputPreviousEl = document.querySelector('[data-prev]');
const outputCurrentEl = document.querySelector('[data-cur]');

const calculator = new Calculator(outputPreviousEl, outputCurrentEl);

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

numberButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.appendNum(btn.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

eqButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

delButton.addEventListener('click', () => {
  calculator.del();
  calculator.updateDisplay();
});
