export class Keyboard {
  constructor() {
    this.language = 'en';
    this.isCapsEnabled = false;
    this.isShiftPressed = false;

    this.keysLayout = [
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    ];
    
    this.enKeys = [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
      ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
      ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⏴', '⏷', '⏵'],
    ];

    this.ruKeys = [
      ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
      ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
      ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⏴', '⏷', '⏵'],
    ];

    this.buildKeyboard = () => {
      const keyboardNode = document.createElement('div');
      const lang = localStorage.getItem('lang');
      if (lang) {
        this.language = lang;
      }
      const keys = (this.language === 'en') ? this.enKeys : this.ruKeys;
     
      keyboardNode.className = 'keyboard';
      
      for (let row = 0; row < keys.length; row++) {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard__row';
        for (let key = 0; key < keys[row].length; key++) {
          const keyNode = document.createElement('button');
          const keyCode = this.keysLayout[row][key];
          const keyText = keys[row][key];
          keyNode.textContent = keyText;
          if (keyText.length === 1 && keyText !== '⏴' && keyText !== '▲' && keyText !== '⏷' && keyText !== '⏵') {
            keyNode.className = `key key_normal ${keyCode}`;
          } else {
            keyNode.className = `key key_special ${keyCode}`;
          }
          keyboardRow.append(keyNode);
        }
        keyboardNode.append(keyboardRow);
      }

      return keyboardNode;
    };

    this.print = (char, textfield) => {
      const caretPosition = textfield.selectionStart;
      const value = textfield.value;
      const valueLength = value.length;
      const stringBeforeCaret = value.slice(0, caretPosition);
      const stringAfterCaret = value.slice(caretPosition, valueLength);
      const newStringBeforeCaret = stringBeforeCaret + char;

      textfield.value = newStringBeforeCaret + stringAfterCaret;
      textfield.selectionStart = newStringBeforeCaret.length;
      textfield.selectionEnd = textfield.selectionStart;
    };

    this.pushBackspace = (textfield) => {
      const caretPosition = textfield.selectionStart;
      const value = textfield.value;
      const valueLength = value.length;
      if (caretPosition > 0) {
        const stringBeforeCaret = value.slice(0, caretPosition - 1);
        const stringAfterCaret = value.slice(caretPosition, valueLength);
        textfield.value = stringBeforeCaret + stringAfterCaret;
        textfield.selectionStart = stringBeforeCaret.length;
        textfield.selectionEnd = textfield.selectionStart;
      }
    };

    this.pushDelete = (textfield) => {
      const caretPosition = textfield.selectionStart;
      const value = textfield.value;
      const valueLength = value.length;
      if (caretPosition < valueLength) {
        const stringBeforeCaret = value.slice(0, caretPosition);
        const stringAfterCaret = value.slice(caretPosition + 1, valueLength);
        textfield.value = stringBeforeCaret + stringAfterCaret;
        textfield.selectionStart = stringBeforeCaret.length;
        textfield.selectionEnd = textfield.selectionStart;
      }
    };

    this.switchLanguage = () => {
      this.language = (this.language === 'en') ? 'ru' : 'en';
      const keys = (this.language === 'en') ? this.enKeys : this.ruKeys;
      const rows = document.querySelectorAll('.keyboard__row');

      for (let row = 0; row < rows.length; row++) {
        const buttons = rows[row].children;
        for (let btn = 0; btn < buttons.length; btn++) {
          const buttonText = buttons[btn].textContent;
          if (buttonText.length === 1) {
            let newButtonText = keys[row][btn];
            if (this.isCapsEnabled) {
              newButtonText = newButtonText.toUpperCase();
            }
            buttons[btn].textContent = newButtonText;
          }
        }
      }
    };

    this.switchToLowerCase = (keys) => {
      for (const key of keys) {
        key.textContent = key.textContent.toLowerCase();
      }
    };

    this.switchToUpperCase = (keys) => {
      for (const key of keys) {
        key.textContent = key.textContent.toUpperCase();
      }
    };

    this.pressShift = () => {
      this.isShiftPressed = true;
      this.pushCapslock();
    };

    this.unpressShift = () => {
      this.isShiftPressed = false;
      this.pushCapslock();
    };

    this.pushCapslock = () => {
      const keys = document.querySelectorAll('.key_normal');

      if (this.isCapsEnabled) {
        this.switchToLowerCase(keys);
      } else {
        this.switchToUpperCase(keys);
      }
      this.isCapsEnabled = !this.isCapsEnabled;
    };
  }
}