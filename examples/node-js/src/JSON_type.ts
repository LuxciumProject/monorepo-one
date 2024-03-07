export {};

export type EmptyObject = `{ }`;
export type EmptyArray = `[ ]`;
export type Coma = `,`;
export type JsonString = `"${string}"`;
export type JsonNumber = `${number}`;
export type escape = '"' | '\\' | '/' | 'b' | 'f' | 'n' | 'r' | 't';
export type uHex = `u${Hex | digit}${Hex | digit}${Hex | digit}${Hex | digit}`;
export type uHEX = `u${HEX | digit}${HEX | digit}${HEX | digit}${HEX | digit}`;
export type hex = uHex | uHEX

export type U1 = `u${Hex}`;
export type U2 = `${U1}${Hex}`;
export type U3 = `${U2}${Hex}`;
// export type U4 = `${U3}${hex}`;

export type Hex = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
export type HEX = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
// escape

// | 'u' hex hex hex hex

// hex
// digit
// 'A' . 'F'
// 'a' . 'f'

//  Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.

// JSON is built on two structures:

// A collection of name/value pairs. In various languages, this is realized as an object, record, struct, dictionary, hash table, keyed list, or associative array.
// An ordered list of values. In most languages, this is realized as an array, vector, list, or sequence.
// These are universal data structures. Virtually all modern programming languages support them in one form or another. It makes sense that a data format that is interchangeable with programming languages also be based on these structures.

// In JSON, they take on these forms:

// An object is an unordered set of name/value pairs. An object begins with {left brace and ends with }right brace. Each name is followed by :colon and the name/value pairs are separated by ,comma.

// An array is an ordered collection of values. An array begins with [left bracket and ends with ]right bracket. Values are separated by ,comma.

// A value can be a string in double quotes, or a number, or true or false or null, or an object or an array. These structures can be nested.

// A string is a sequence of zero or more Unicode characters, wrapped in double quotes, using backslash escapes. A character is represented as a single character string. A string is very much like a C or Java string.

// A number is very much like a C or Java number, except that the octal and hexadecimal formats are not used.

// Whitespace can be inserted between any pair of tokens. Excepting a few encoding details, that completely describes the language.

// json
// element

// value
// object
// array
// string
// number
// "true"
// "false"
// "null"

// object
// '{' ws '}'
// '{' members '}'

// members
// member
// member ',' members

// member
// ws string ws ':' element

// array
// '[' ws ']'
// '[' elements ']'

// elements
// element
// element ',' elements

// element
// ws value ws

// string
// '"' characters '"'

// characters
// ""
// character characters

// character
// '0020' . '10FFFF' - '"' - '\'
// '\' escape

// escape
// '"'
// '\'
// '/'
// 'b'
// 'f'
// 'n'
// 'r'
// 't'
// 'u' hex hex hex hex

// hex
// digit
// 'A' . 'F'
// 'a' . 'f'

// number
// integer fraction exponent

// integer
// digit
// onenine digits
// '-' digit
// '-' onenine digits

// digits
// digit
// digit digits

// digit
// '0'
// onenine

// onenine
// '1' . '9'

// fraction
// ""
// '.' digits

// exponent
// ""
// 'E' sign digits
// 'e' sign digits

// sign
// ""
// '+'
// '-'

// ws
// ""
// '0020' ws
// '000A' ws
// '000D' ws
// '0009' ws
