import { Keyboard } from './assets/js/Keyboard.js';

const keyboard = new Keyboard();

const renderElementsDOM = () => {
  const inputWrapper = document.createElement('div');
  const input = document.createElement('textarea');
  const info = document.createElement('p');
  const keyboardNode = keyboard.buildKeyboard();

  inputWrapper.className = 'input-wrapper';
  input.className = 'textfield';
  input.setAttribute('cols', 50);
  input.setAttribute('rows', 10);
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

keyboardNode.addEventListener('mousedown', (e) => {
  e.preventDefault();
  const clickedTag = e.target.tagName;
  if (clickedTag === 'BUTTON') {
    const buttonText = e.target.textContent;
    if (e.target.classList.contains('key_normal')) {
      const char = e.target.textContent;
      keyboard.print(char, textfield);
    }

    if (buttonText === 'Space') {
      keyboard.pushSpace(textfield);
    }

    if (buttonText === 'Tab') {
      keyboard.pushTab(textfield);
    }

    if (buttonText === 'Enter') {
      keyboard.pushEnter(textfield);
    }

    if (buttonText === 'Backspace') {
      keyboard.pushBackspace(textfield);
    }

    if (buttonText === 'Del') {
      keyboard.pushDelete(textfield);
    }

    if (buttonText === 'Caps Lock') {
      keyboard.pushCapslock();
    }
    
    if (buttonText === 'Shift' && !keyboard.isShiftPressed) {
      keyboard.pressShift();
    }
  }
});

keyboardNode.addEventListener('mouseup', (e) => {
  const buttonText = e.target.textContent;
  if (buttonText === 'Shift') {
    keyboard.unpressShift();
  }
});

document.body.addEventListener('keydown', (e) => {
  e.preventDefault();
  const keyCode = e.code;
  const keyText = document.querySelector(`.${keyCode}`)?.textContent;
  if (!keyText) return;

  if (isChar(keyText)) {
    keyboard.print(keyText, textfield);
  }

  if (keyCode === 'Space') {
    keyboard.pushSpace(textfield);
  }

  if (keyCode === 'Tab') {
    keyboard.pushTab(textfield);
  }

  if (keyCode === 'Enter') {
    keyboard.pushEnter(textfield);
  }

  if (keyCode === 'Backspace') {
    keyboard.pushBackspace(textfield);
  }

  if (keyCode === 'Delete') {
    keyboard.pushDelete(textfield);
  }

  if (e.ctrlKey && e.shiftKey || e.metaKey && e.shiftKey) {
    keyboard.switchLanguage();
  }

  if (keyCode === 'CapsLock' && !e.repeat) {
    keyboard.pushCapslock();
  }

  if (e.shiftKey && !keyboard.isShiftPressed) {
    keyboard.pressShift();
  }
});

document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Shift') {
    keyboard.unpressShift();
  }
});