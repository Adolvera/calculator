//Selects buttons
const oneButton = document.getElementById('one');
const twoButton = document.getElementById('two');
const threeButton = document.getElementById('three');
const fourButton = document.getElementById('four');
const fiveButton = document.getElementById('five');
const sixButton = document.getElementById('six');
const sevenButton = document.getElementById('seven');
const eightButton = document.getElementById('eight');
const nineButton = document.getElementById('nine');
const zeroButton = document.getElementById('zero');
const equalButton = document.getElementById('equal');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const divideButton = document.getElementById('divide');
const multiplyButton = document.getElementById('multiply');
const clearButton = document.getElementById('clear');
const clearEntryButton = document.getElementById('clear-entry');
const decimalButton = document.getElementById('decimal');
const signButton = document.getElementById('sign');
const display = document.getElementById('current');
const history = document.getElementById('history');

//Event listeners
oneButton.addEventListener('click', () => displayNumbers('1'));
twoButton.addEventListener('click', () => displayNumbers('2'));
threeButton.addEventListener('click', () => displayNumbers('3'));
fourButton.addEventListener('click', () => displayNumbers('4'));
fiveButton.addEventListener('click', () => displayNumbers('5'));
sixButton.addEventListener('click', () => displayNumbers('6'));
sevenButton.addEventListener('click', () => displayNumbers('7'));
eightButton.addEventListener('click', () => displayNumbers('8'));
nineButton.addEventListener('click', () => displayNumbers('9'));
zeroButton.addEventListener('click', () => displayNumbers('0'));

addButton.addEventListener('click', () => signInput('+'));
subtractButton.addEventListener('click', () => signInput('-'));
multiplyButton.addEventListener('click', () => signInput('*'));
divideButton.addEventListener('click', () => signInput('/'));

equalButton.addEventListener('click', () => getEqual());
decimalButton.addEventListener('click', () => checkDecimal());
clearButton.addEventListener('click', () => fullClear());
signButton.addEventListener('click', () => flipSign());

//Allows for num key input
window.addEventListener('keydown', (e) => checkKey(e));

//clears display
clearEntryButton.addEventListener('click', () => {
  displayValue = '';
  display.textContent = '0';
})

//Initialize global variables
let displayValue = '';
let firstNumber = 0;
let secondNumber = 0;
let currentHistory = '';
let answerToggle = false;

//Simple math functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

//runs desired function based on sign
const operate = (operator, num1, num2) => {
  if (operator === "add") return add(num1, num2);

  if (operator === "subtract") return subtract(num1, num2);

  if (operator === "multiply") return multiply(num1, num2);

  if (operator === "divide") return divide(num1, num2);
}

//prints number clicked to display
const displayNumbers = (number) => {
  if (display.textContent.length >= 18) return;

  //stops addition of numbers to final answer
  if (answerToggle) {
    fullClear();
    answerToggle = false;
  }
  displayValue += `${number}`;
  display.textContent = displayValue;
}

//flips sign on display num
const flipSign = () => {
  if (display.textContent.charAt(0) != '-') {
    display.textContent = '-' + display.textContent;
    displayValue = display.textContent;
  } else {
    display.textContent = display.textContent.slice(1);
    displayValue = display.textContent;
  }
}

//decimal input if there is none in display yet
const checkDecimal = () => {
  if (display.textContent.includes(".")) return;

  display.textContent += ".";
  displayValue = display.textContent;
}

//Function for calculation based on sign clicked
const signInput = (sign) => {
  answerToggle = false;
  currentHistory = history.textContent;

  //checks to see if there is already a number in the history
  if (currentHistory.includes('+') || currentHistory.includes('-') || 
  currentHistory.includes('*') || currentHistory.includes('/')) {

    if (display.textContent === '') {
      history.textContent = history.textContent.slice(0, -1) + ` ${sign}`;
      return;
    }
    
    //calculates second num based on display and operates on both nums
    secondNumber = Number(displayValue);
    let answer = sendOperator(currentHistory.slice(-1), firstNumber, secondNumber);

    if (answer.length >= 18) answer = answer.slice(0, 17);
    if (answer === 'Fuck off lol') answer = 0;

    history.textContent = `${answer} ${sign}`
    firstNumber = answer;
    display.textContent = '';
    displayValue = '';

  } else {
    history.textContent += ` ${displayValue} ${sign}`;
    display.textContent = '';
    firstNumber = Number(displayValue);
    displayValue = '';
  }
}

//function for calculations when equal sign is clicked
const getEqual = () => {
  if (display.textContent === '') return;

  currentHistory = history.textContent;
  let sign = currentHistory.slice(-1);
  secondNumber = Number(displayValue);
  let answer = sendOperator(sign, firstNumber, secondNumber);
  history.textContent = '';

  if (answer.length >= 18) answer = answer.slice(0, 17);

  display.textContent = `${answer}`;

  if (answer === 'Fuck off lol') answer = '0';
  firstNumber = answer;
  displayValue = answer;
  answerToggle = true;
}

//runs correct calculation based on sign input
const sendOperator = (sign, firstNumber, secondNumber) => {
  if (sign == '+') return operate('add', firstNumber, secondNumber);
  if (sign == '-') return operate('subtract', firstNumber, secondNumber);
  if (sign == '*') return operate('multiply', firstNumber, secondNumber);
  if (sign == '/') {
    //checks for division by zero
    if (secondNumber === 0) return "Fuck off lol";
    return operate('divide', firstNumber, secondNumber);
  }

}

//clears calculator(reset)
const fullClear = () => {
  displayValue = '';
  firstNumber = 0;
  secondNumber = 0;
  currentHistory = '';
  history.textContent = '';
  display.textContent = '0';
}

//Checks for valid key press
const checkKey = (e) => {
  const keyPressObject = {
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "0": 48
  }

  for (const [key, value] of Object.entries(keyPressObject)) {
    if (e.keyCode === value) displayNumbers(key);
  }
}