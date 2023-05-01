import { Keyboard } from './assets/js/Keyboard.js';

const keyboard = new Keyboard();

const renderElementsDOM = () => {
  const container = document.createElement('div');
  const inputWrapper = document.createElement('div');
  const input = document.createElement('textarea');
  const info = document.createElement('p');
  const keyboardNode = keyboard.buildKeyboard();

  container.className = 'container';
  inputWrapper.className = 'input-wrapper';
  input.className = 'textfield';
  input.setAttribute('cols', 50);
  input.setAttribute('rows', 10);
  info.className = 'info';
  info.textContent = 'Switch language: Ctrl + Shift | OS: Windows';

  inputWrapper.append(input);
  container.append(inputWrapper, keyboardNode, info);
  document.body.append(container);
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
    const button = e.target;
    const buttonText = button.textContent;
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

    button.classList.add('active');
  }
});

keyboardNode.addEventListener('mouseup', (e) => {
  const button = e.target;
  const buttonText = button.textContent;
  if (buttonText === 'Shift') {
    keyboard.unpressShift();
  }

  if (buttonText !== 'Caps Lock' || !keyboard.isCapsEnabled) {
    button.classList.remove('active');
  }
});

document.body.addEventListener('keydown', (e) => {
  e.preventDefault();
  const keyCode = e.code;
  const keyNode = document.querySelector((`.${keyCode}`));
  const keyText = keyNode?.textContent;
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

  if (!e.repeat) {
    keyNode.classList.add('active');
  }
});

document.body.addEventListener('keyup', (e) => {
  const keyCode = e.code;
  const keyNode = document.querySelector((`.${keyCode}`));
  if (!keyNode) return;

  if (e.key === 'Shift') {
    keyboard.unpressShift();
  }

  if (keyCode !== 'CapsLock' || !keyboard.isCapsEnabled) {
    keyNode.classList.remove('active');
  }
});