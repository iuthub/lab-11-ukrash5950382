window.onload=function () {
    let calculator = document.querySelector('.calculator');
    let keys = calculator.querySelector('.calculator__keys');
    const display = document.querySelector('.calculator__display');
    const calc = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };
    function updateDisplay() {
        const display = document.querySelector('.calculator__display');
        display.value = calc.displayValue;
    }

    updateDisplay();

    keys.addEventListener('click', (e) => {
        const { target } = e;
        const action = target.dataset.action;
        const keyContent = target.textContent;
        const displayedNum = display.textContent;

        if (e.target.matches('button')) {


            if (!action) {
                function inputDigit(digit) {
                    const {displayValue, waitingForSecondOperand} = calc;

                    if (waitingForSecondOperand === true) {
                        calc.displayValue = digit;
                        calc.waitingForSecondOperand = false;
                    } else {
                        if (displayedNum === '0') {
                            display.textContent = keyContent
                        } else {
                            display.textContent = displayedNum + keyContent
                        }
                    }
                    console.log(calc);
                }
                inputDigit(target.value);
                updateDisplay();
            }
            if (action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide') {
                function handleOperator(nextOperator) {
                    const { firstOperand, displayValue, operator } = calc;
                    const inputValue = parseFloat(displayValue);

                    if (operator && calc.waitingForSecondOperand)  {
                        calc.operator = nextOperator;
                        console.log(calc);
                        return;
                    }

                    if (firstOperand === null) {
                        calc.firstOperand = inputValue;
                    } else if (operator) {
                        const currentValue = firstOperand || 0;
                        const result = performCalculation[operator](currentValue, inputValue);

                        calc.displayValue = String(result);
                        calc.firstOperand = result;
                    }
                    calc.waitingForSecondOperand = true;
                    calc.operator = nextOperator;
                    console.log(calc);
                }
                const performCalculation = {
                    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

                    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

                    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

                    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

                    '=': (firstOperand, secondOperand) => secondOperand
                };
                handleOperator(target.value);
                updateDisplay();
            }
            if (action === 'decimal') {
                function inputDecimal(dot) {
                    if (calc.waitingForSecondOperand === true) return;

                    if (!calc.displayValue.includes(dot)) {
                        calc.displayValue += dot;
                    }
                }
                inputDecimal(target.value);
                updateDisplay();
            }
            if (action === 'clear') {
                function resetCalculator() {
                    calc.displayValue = '0';
                    calc.firstOperand = null;
                    calc.waitingForSecondOperand = false;
                    calc.operator = null;
                    console.log(calc);
                }
                resetCalculator();
                updateDisplay();
            }
            if (action === 'calculate') {
                if (displayedNum === '0') {
                    display.textContent = keyContent
                } else {
                    display.textContent = displayedNum + keyContent
                }
            }
        }
    })
};