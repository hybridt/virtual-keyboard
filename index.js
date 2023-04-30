import { Keyboard } from './assets/js/Keyboard.js';

const keyboard = new Keyboard();

const renderElementsDOM = () => {
  const inputWrapper = document.createElement('div');
  const input = document.createElement('textarea');
  const info = document.createElement('p');
  const keyboardNode = keyboard.buildKeyboard();

  inputWrapper.className = 'input-wrapper';
  input.className = 'textfield';
  info.className = 'info';
  info.textContent = 'Switch language: Ctrl + Shift | OS: Windows';

  inputWrapper.append(input);
  document.body.append(inputWrapper, keyboardNode, info);
};

const isChar = (string) => {
  return string.length === 1;
};

renderElementsDOM();

const keyboardNode = document.querySelector('.keyboard');
const textfield = document.querySelector('.textfield');

window.addEventListener('unload', () => {
  localStorage.setItem('lang', keyboard.language);
});

textfield.addEventListener('keydown', (e) => {
  e.preventDefault();
});

keyboardNode.addEventListener('click', (e) => {
  if (document.activeElement === textfield) return;
  const clickedTag = e.target.tagName;
  if (clickedTag === 'BUTTON') {
    if (e.target.classList.contains('key_normal')) {
      const char = e.target.textContent;
      keyboard.print(char, textfield);
    }

    if (e.target.textContent === 'Backspace') {
      keyboard.pushBackspace(textfield);
    }
  }
});

document.body.addEventListener('keydown', (e) => {
  // if (document.activeElement === textfield) return;
  const pressedKey = e.key;
  if (isChar(pressedKey)) {
    keyboard.print(pressedKey, textfield);
  }

  if (pressedKey === 'Backspace') {
    keyboard.pushBackspace(textfield);
  }

  if (e.ctrlKey && e.shiftKey) {
    keyboard.switchLanguage();
  }
});