export function sanitizeOutputToCliSafe(
  output_string: string,
  unix_like = true
): string {
  // First lets ensure no ccommands are executed and no exploits are run.

  let output = output_string.replace(/`/g, '\\`'); // this is to ensure that the backtick character is escaped.
  output = output.replace(/\$/g, '\\$'); // this ensures that the dollar sign is escaped.
  output = output.replace(/\\/g, '\\\\'); // this ensures that the backslash is escaped.
  output = output.replace(/"/g, '\\"'); // this ensures that the double quote is escaped.
  output = output.replace(/'/g, "\\'"); // this ensures that the single quote is escaped.
  // Now we need to ensure that the new line character is preserved.
  if (unix_like) {
    output = output.replace(/\r\n/g, '\\n'); // this ensures that the new line character is preserved.
  } else {
    output = output.replace(/\r\n/g, '\\r\\n'); // this ensures that the new line character is preserved.
  }
  // Now that the new line character is preserved, we need to ensure that the tab character is preserved.
  output = output.replace(/\t/g, '\\t'); // this ensures that the tab character is preserved.

  return output;
}

export function sanitizeOutputToCliSafe_(
  output_string: string,
  unix_like = true
): string {
  let output = output_string;
  output = output.replace(/\\/g, '\\\\'); // Escape backslashes first
  output = output.replace(/`/g, '\\`'); // Escape backtick
  output = output.replace(/\$/g, '\\$'); // Escape dollar sign
  output = output.replace(/"/g, '\\"'); // Escape double quote
  output = output.replace(/'/g, "\\'"); // Escape single quote

  // Preserve new line characters
  if (unix_like) {
    output = output.replace(/\r\n/g, '\\n'); // Preserve Unix-style new lines
  } else {
    output = output.replace(/\r\n/g, '\\r\\n'); // Preserve Windows-style new lines
  }

  output = output.replace(/\t/g, '\\t'); // Preserve tab characters

  return output;
}


/*
let output = output_string.replace(/\x1b\[\d+m/g, '');

output = output.replace(/\n/g, '\n'); // new line
output = output.replace(/\r/g, '\r'); // carriage return
output = output.replace(/\t/g, '\t'); // tab
output = output.replace(/\b/g, '\b'); // backspace
output = output.replace(/\f/g, '\f'); // form feed
output = output.replace(/\a/g, '\a'); // alert (bell)
output = output.replace(/\e/g, '\e'); // escape
output = output.replace(/\s/g, '\s'); // space
output = output.replace(/\v/g, '\v'); // vertical tab
output = output.replace(/\0/g, '\0'); // null
output = output.replace(/\x1/g, '\x1'); // start of heading
output = output.replace(/\x1b/g, '\x1b'); // escape
output = output.replace(/\x1c/g, '\x1c'); // file separator
output = output.replace(/\x1d/g, '\x1d'); // group separator
output = output.replace(/\x1e/g, '\x1e'); // record separator
output = output.replace(/\x1f/g, '\x1f'); // unit separator
output = output.replace(/\x7f/g, '\x7f'); // delete
output = output.replace(/\x80/g, '\x80'); // padding character
output = output.replace(/\x81/g, '\x81'); // high octet preset
output = output.replace(/\x82/g, '\x82'); // break permitted here
output = output.replace(/\x83/g, '\x83'); // no break here
output = output.replace(/\x84/g, '\x84'); // index
output = output.replace(/\x85/g, '\x85'); // next line
output = output.replace(/\x86/g, '\x86'); // start of selected area
output = output.replace(/\x87/g, '\x87'); // end of selected area
output = output.replace(/\x88/g, '\x88'); // character tabulation set
output = output.replace(/\x89/g, '\x89'); // character tabulation with justification
output = output.replace(/\x8a/g, '\x8a'); // line tabulation set
output = output.replace(/\x8b/g, '\x8b'); // partial line forward
output = output.replace(/\x8c/g, '\x8c'); // partial line backward
output = output.replace(/\x8d/g, '\x8d'); // reverse line feed
output = output.replace(/\x8e/g, '\x8e'); // single shift two
output = output.replace(/\x8f/g, '\x8f'); // single shift three
output = output.replace(/\x90/g, '\x90'); // device control string
output = output.replace(/\x91/g, '\x91'); // private use one
output = output.replace(/\x92/g, '\x92'); // private use two
output = output.replace(/\x93/g, '\x93'); // set transmit state
output = output.replace(/\x94/g, '\x94'); // cancel character
output = output.replace(/\x95/g, '\x95'); // message waiting
output = output.replace(/\x96/g, '\x96'); // start of guarded area
output = output.replace(/\x97/g, '\x97'); // end of guarded area
output = output.replace(/\x98/g, '\x98'); // start of string
// source: https://en.wikipedia.org/wiki/C0_and_C1_control_codes


 */