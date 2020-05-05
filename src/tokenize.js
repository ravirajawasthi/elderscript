const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = (input) => {
  let tokens = [];
  let cursor = 0;
  while (cursor < input.length) {
    const character = input[cursor];
    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });
      cursor++;
      continue;
    }

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      let currNumber = character;
      while (isNumber(input[++cursor])) {
        currNumber += input[cursor];
      }
      tokens.push({
        type: 'Number',
        value: parseInt(currNumber),
      });
      continue;
    }

    if (isLetter(character)) {
      let currWord = character;
      while (isLetter(input[++cursor])) {
        currWord += input[cursor];
      }
      tokens.push({ type: 'Name', value: currWord });
      continue;
    }

    if (isQuote(character)) {
      let currString = '';
      while (!isQuote(input[++cursor])) {
        currString += input[cursor];
      }
      tokens.push({
        type: 'String',
        value: currString,
      });
      cursor++;
      continue;
    }

    throw new Error(`${character} is not valid!`);
  }
  return tokens;
};

module.exports = { tokenize };
