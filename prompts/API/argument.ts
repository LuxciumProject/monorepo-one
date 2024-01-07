type Argument = 'This is an Argument!';
function negotiate(parameter: Argument) {
  //ok I have parametrized my function to take one argument
  // Let's negotiate...
  if (parameter === 'This is an Argument!') {
    return 'Josh Will never Forget';
  }

  return 'Josh Will need a better argument';
}
//@ts-ignore
negotiate('This is a parameter?'); // 'Josh Will need a better argument'

negotiate('This is an Argument!'); // 'Josh Will never Forget'
