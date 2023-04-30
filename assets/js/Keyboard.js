export class Keyboard {
  constructor() {
    this.language = 'en';
    
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
      for (const row of keys) {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard__row';
        for (const key of row) {
          const keyNode = document.createElement('button');
          keyNode.textContent = key;
          if (key.length === 1 && key !== '⏴' && key !== '▲' && key !== '⏷' && key !== '⏵') {
            keyNode.className = 'key key_normal';
          } else {
            keyNode.className = 'key key_special';
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

    this.switchLanguage = () => {
      if (this.language === 'en') {
        this.language = 'ru';
      } else {
        this.language = 'en';
      }
      const keys = (this.language === 'en') ? this.enKeys : this.ruKeys;
      const rows = document.querySelectorAll('.keyboard__row');

      for (let row = 0; row < rows.length; row++) {
        const buttons = rows[row].children;
        for (let btn = 0; btn < buttons.length; btn++) {
          buttons[btn].textContent = keys[row][btn];
        }
      }
    };
  }
}