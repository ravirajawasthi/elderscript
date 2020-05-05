const { prompt } = require('inquirer');
const chalk = require('chalk');

const { parseAndEvaluate } = require('./parse-and-evaluate');

const askQuestion = () => {
  const questions = [
    { name: 'COMMAND', type: 'input', message: chalk.blue('>') },
  ];
  return prompt(questions);
};

const repl = async () => {
  try {
    const answers = await askQuestion();
    const { COMMAND } = answers;
    if (COMMAND.trim()) {
      console.log(chalk.yellow(parseAndEvaluate(COMMAND)));
    }
  } catch (err) {
    console.error(err);
  }
  repl();
};

if (require.main === module) {
  console.log(
    chalk.green(
      `Welcome to the ${chalk.black(
        chalk.bgCyan('ElderScript'),
      )} Programming Language`,
    ),
  );
  repl();
}

module.exports = repl;
