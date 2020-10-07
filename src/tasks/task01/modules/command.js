const { Command } = require('commander');
const { ACTION, INIT, OPTIONS_REQUIRED, OPTIONS } = require('./config');
const { errorHandler } = require('./util');

const program = new Command();

const args = [];

function initCommand() {
  program.storeOptionsAsProperties(false).passCommandToAction(false);

  program
    .name(INIT.NAME)
    .version(INIT.VERSION.str, INIT.VERSION.flags, INIT.VERSION.description)
    .description(INIT.DESCRIPTION);
}

function setOptions() {
  Object.values(OPTIONS_REQUIRED).forEach(option =>
    program.requiredOption(option.flags, option.description)
  );
  Object.values(OPTIONS).forEach(option =>
    program.option(option.flags, option.description)
  );
}

function parseConsole() {
  program.parse(process.argv);
  if (process.argv.length < 3) {
    program.help();
  } else {
    [...Object.entries(program._optionValues)].forEach(
      option => (args[option[0]] = option[1])
    );
    args.shift = parseInt(args.shift, 10);

    // если опции присутсвуют, но значения не указаны, то есть имена файлов не указаны - ввод и ввывод будут в консоли
    if (typeof args.input === 'boolean') args.input = undefined;
    if (typeof args.output === 'boolean') args.output = undefined;
  }
}

function fileOk(path) {
  const fs = require('fs');
  let result = true;
  try {
    fs.accessSync(path, fs.constants.R_OK);
  } catch (err) {
    result = false;
    errorHandler(err);
  }
  return result;
}

function validateArgs() {
  if (!ACTION.includes(args.action)) {
    errorHandler(
      new Error('the option "action" value must be "encode" or "decode"')
    );
  }

  if (isNaN(args.shift)) {
    errorHandler(new Error('the option "shift" value must be a number'));
  }

  if (args.input) {
    fileOk(args.input);
  }

  if (args.output) {
    fileOk(args.output);
  }
}

function readConsole() {
  initCommand();
  setOptions();
  parseConsole();
  validateArgs();
  return args;
}

module.exports = { readConsole };
