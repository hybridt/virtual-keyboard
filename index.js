import { Keyboard } from './assets/js/Keyboard.js';

const keyboard = new Keyboard();

const renderElementsDOM = () => {
  const inputWrapper = document.createElement('div');
  const input = document.createElement('textarea');
  const keyboardNode = keyboard.buildKeyboard();

  inputWrapper.className = 'input-wrapper';
  input.className = 'textfield';

  inputWrapper.append(input);
  document.body.append(inputWrapper, keyboardNode);
};

const isChar = (string) => {
  return string.length === 1;
};

renderElementsDOM();

const keyboardNode = document.querySelector('.keyboard');
const textfield = document.querySelector('.textfield');

keyboardNode.addEventListener('click', (e) => {
  const clickedTag = e.target.tagName;
  if (clickedTag === 'BUTTON' && e.target.classList.contains('key_normal')) {
    const char = e.target.textContent;
    keyboard.print(char, textfield);
  }
});

document.body.addEventListener('keydown', (e) => {
  const pressedKey = e.key;
  if (isChar(pressedKey)) {
    keyboard.print(pressedKey, textfield);
  }

  if (pressedKey === 'Backspace') {
    keyboard.pushBackspace(textfield);
  }
});

textfield.addEventListener('keydown', (e) => {
  e.preventDefault();
});