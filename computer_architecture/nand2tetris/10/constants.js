const KEYWORD_CONSTANT = 'KEYWORD';
const SYMBOL_CONSTANT = 'SYMBOL';
const INTERGER_CONSTANT = 'INT_CONST';
const STRING_CONSTANT = 'STRING_CONST';
const IDENTIFIER_CONSTANT = "IDENTIFIER";



const COMMENT_SYMBOLS = ['//', '/*'];

const BLANK_LINE = "";
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


module.exports = {
  RESERVED_KEYWORDS,
  RESERVED_SYMBOLS,
  COMMENT_SYMBOLS,
  KEYWORD_CONSTANT,
  STRING_CONSTANT,
  SYMBOL_CONSTANT,
  BLANK_LINE,
  INTERGER_CONSTANT,
  IDENTIFIER_CONSTANT
}