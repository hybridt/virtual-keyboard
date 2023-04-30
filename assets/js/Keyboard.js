export class Keyboard {
  constructor() {
    
    this.enKeys = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⏴', '⏷', '⏵',
    ];

    this.ruKeys = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
      'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '⏴', '⏷', '⏵',
    ];

    this.buildKeyboard = () => {
      const keyboardNode = document.createElement('div');
      const lang = localStorage.getItem('lang') || 'en';
      const keys = (lang === 'en') ? this.enKeys : this.ruKeys;
     
      keyboardNode.className = 'keyboard';
    
      for (const key of keys) {
        const keyNode = document.createElement('button');
    
        keyNode.textContent = key;
        if (key.length === 1 && key !== '⏴' && key !== '▲' && key !== '⏷' && key !== '⏵') {
          keyNode.className = 'key key_normal';
        } else {
          keyNode.className = 'key key_special';
        }
        
        keyboardNode.append(keyNode);
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
      }
    };
  }
}