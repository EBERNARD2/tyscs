const fs = require('node:fs');

const COMMENT_SYMBOLS = ['//', '/*'];

const BLANK_LINE = "";


module.exports = class JackTokenizer {
  constructor(inputFile){
    const currentFile = fs.readFileSync(inputFile);

    const fileLines = currentFile.toString().split('\n');

    this.file = fileLines.map((line) => line.trim());
    this.currentToken = null;
  }

  #currentLine = this.file[this.#currentLineIndex];
  #currentLineIndex = 0;

  hasMoreTokens(){
    if (this.#currentLineIndex != this.file.length) {
      return true;
    }

    return false;
  }

  // advance

  getNextValidLine

  advance(){

    // Skip invalid lines until we find a line to process
    let currentLine = this.file[this.#currentLineIndex];
    let comment = currentLine.slice(0,2);

    while (COMMENT_SYMBOLS.includes(comment) || currentLine === BLANK_LINE) {
      this.#currentLineIndex++;
      currentLine = this.file[this.#currentLineIndex];
      comment = currentLine.slice(0,2);
    }

    this.#currentLineIndex++;
  }

  tokenType(){}

  keyword(){}
  
  symbol(){}

  identifier(){}

  intVal(){}

  stringVal(){}
}