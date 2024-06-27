const fs = require('node:fs');

const COMMENT_SYMBOLS = ['//', '/*'];

const BLANK_LINE = "";
const KEYWORD_CONSTANT = 'KEYWORD';
const SYMBOL_CONSTANT = 'SYMBOL';
const INTERGER_CONSTANT = 'INT_CONST';
const STRING_CONSTANT = 'STRING_CONST';
const IDENTIFIER_CONSTANT = "IDENTIFIER";
const RESERVED_KEYWORDS = [
  "class",
  "constructor",
  "function",
  "method",
  "field",
  "static",
  "var",
  "int",
  "char",
  "boolean",
  "void",
  "true",
  "false",
  "null",
  "this",
  "let",
  "do",
  "if",
  "else",
  "while",
  "return"
];

const RESERVED_SYMBOLS = [
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
  ".",
  "'",
  ";",
  "+",
  "-",
  "/",
  "&",
  "|",
  "<",
  ">",
  "=",
  "~"
];


module.exports = class JackTokenizer {
  #currentLineIndex; 
  #currentValuesToParse; 
  #currentToken;

  constructor(inputFile){
    const currentFile = fs.readFileSync(inputFile);

    const fileLines = currentFile.toString().split('\n');

    this.file = fileLines.map((line) => line.trim()).filter((f) => {
      const comment = f[0] + f[1];
      return !(COMMENT_SYMBOLS.includes(comment) || f === BLANK_LINE)
    });
    this.#currentToken = [];
    this.#currentLineIndex = 0;
    this.#currentValuesToParse = [];
  }

  hasMoreTokens(){
    if (this.#currentLineIndex < this.file.length || this.#currentValuesToParse.length) {
      return true;
    }

    return false;
  }

  #getNextValidLine() {
     // Skip invalid lines until we find a line to process
     let currentLine = this.file[this.#currentLineIndex];
     
     const lineValues = currentLine.split(" ");


     const scrubValues = lineValues.reduce((accumulator, value, i) => {


      let valuesToPush = [];
      
      /*
        We will also need to parse function invokation tokens, class methods (class.method), and array variables
      */

      if (value[value.length - 1] === ';') {
        valuesToPush.push(value.slice(0, value.length - 1));
        valuesToPush.push(";");
      } 
      
      if (value[value.length - 1] === ")" && value[value.length - 2] === "("){
        const slicedVal = value.slice(0, value.length - 2);
        const classMethod = slicedVal[value.length - 3] === '.';
        
        if (classMethod) {
          valuesToPush.push(slicedVal.slice(0, slicedVal.length - 1));
          valuesToPush.push(".");
          /// this is not quite correct. We need to figure out a way to seperate the period
        } else
          valuesToPush.push(slicedVal);

        valuesToPush.push("(");
        valuesToPush.push(")");
      }



      if (value[0] === '(' && value.length > 1 && value[value.length - 1] === ")"){
        const valueToPush = value.split(/[()]/)[1];
        valuesToPush[0] = valueToPush;
      }
      
      if (valuesToPush[0] && valuesToPush[0][0] === "(" && valuesToPush[0][valuesToPush[0].length - 1] === ")") {
        valuesToPush[0] = valuesToPush[0].split(/[()]/)[1];
      }

      valuesToPush.length ? accumulator.push(...valuesToPush) : accumulator.push(value);

      return accumulator;
     }, []);

     this.#currentValuesToParse = scrubValues;
     console.log(scrubValues);
     this.#currentLineIndex++;
  }

  advance() {
    // Go to next line if there aren't any more values to parse 
    if (this.#currentValuesToParse.length === 0 ) this.#getNextValidLine();

    while(this.#currentValuesToParse[0] === '' || this.#currentValuesToParse[0] === '//'){
      if (this.#currentValuesToParse[0] === '//') {
        this.#getNextValidLine();
      } else {
        this.#currentValuesToParse.shift();
      }
    }

    if (this.#currentValuesToParse[0] === '//') {
      this.#currentLineIndex++;
      this.#getNextValidLine();
    }
      

    this.#currentToken = this.#currentValuesToParse.shift();
  }

  tokenType(){
    // There are 5 categories:
    // Keywords, symbols, intergerConstants, stringConstants, and identifiers

    if (RESERVED_KEYWORDS.includes(this.#currentToken))
      return KEYWORD_CONSTANT;

    if (RESERVED_SYMBOLS.includes(this.#currentToken)) 
      return SYMBOL_CONSTANT;
    
    if (parseInt(this.#currentToken)) 
      return INTERGER_CONSTANT;

    if (this.#currentToken[0] === "\"" || this.#currentToken[this.#currentToken.length - 1] === "\"")
      return STRING_CONSTANT;

    if (this.#checkIdentifier())
      return IDENTIFIER_CONSTANT;
    
    console.error(`Invalid keyword, symbols, interger constant, string const, or identifier:  ${this.#currentToken}`);
    process.exit(1);
  }

  #checkIdentifier(){
    // Identifiers are invalid if token starts with an interger

    const invalidInteger = parseInt(this.#currentToken[0]);

    if (invalidInteger) {
      console.error(`Identifiers must not start with integer: ${this.#currentToken}`);
      process.exit(1);
    }

    return true;
  }

  #returnCurrentToken(){
    return this.#currentToken;
  }

  keyword(){
    return this.#returnCurrentToken();
  }
  
  symbol(){
    return this.#returnCurrentToken();
  }

  identifier(){
    return this.#returnCurrentToken();
  }

  intVal(){
    return this.#returnCurrentToken();
  }

  stringVal(){
    return this.#returnCurrentToken();
  }
}