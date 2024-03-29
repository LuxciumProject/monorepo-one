import inquirer from 'inquirer';

const questions: any[] = [
  {
    type: 'list',
    name: 'choice',
    message: 'Please choose an option:',
    choices: ['Option 1', 'Option 2', 'Option 3'],
  },
];

inquirer.prompt(questions).then(answers => {
  console.log(`You chose: ${answers.choice}`);
});
