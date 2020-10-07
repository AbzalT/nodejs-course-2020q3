/** *
 * https://issue.life/questions/36814804/how-do-you-handle-the-shift-on-a-caesar-cipher-in-javascript
 * https://github.com/mathiasbynens/rot/blob/master/rot.js
 * и весь остальной гугол...
 */

const { alphabet } = require('./config');

const caesar = (string, shift, action = 'encode') => {
  if (action === 'decode') {
    shift *= -1;
  }
  const length = alphabet.length;
  return string
    .split('')
    .map(symbol => {
      const lowerCaseSymbol = symbol.toLowerCase();
      const currentPosition = alphabet.indexOf(lowerCaseSymbol);
      if (currentPosition >= 0) {
        const isLowerCase = symbol === lowerCaseSymbol;
        let shiftedPosition = (currentPosition + shift) % length;
        if (shiftedPosition < 0) {
          shiftedPosition += length;
        }
        let result = alphabet[shiftedPosition];
        if (!isLowerCase) {
          result = result.toUpperCase();
        }
        return result;
      }
      return symbol;
    })
    .join('');
};

module.exports = { caesar };
