import { Keyboard } from './assets/js/Keyboard.js';

const keyboard = new Keyboard();

const renderDOM = () => {
  const inputWrapper = document.createElement('div');
  const input = document.createElement('textarea');
  const keyboardNode = keyboard.buildKeyboard();

  inputWrapper.className = 'input-wrapper';
  input.className = 'textfield';

  inputWrapper.append(input);
  document.body.append(inputWrapper, keyboardNode);
};

renderDOM();