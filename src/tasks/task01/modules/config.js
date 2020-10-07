const ACTION = ['encode', 'decode'];

const INIT = {
  NAME: 'my_caesar_cli',
  VERSION: {
    str: '1.0.0',
    flags: '-v, --version',
    description: 'output the current version'
  },
  DESCRIPTION:
    'RS School NodeJS course - 2020Q3\nTask 1 - Caesar cipher CLI tool.\nby Abzal.Tankibayev@outlook.com'
};

const OPTIONS_REQUIRED = {
  ACTION: {
    flags: '-a, --action <action>',
    description: 'an action encode or decode'
  },
  SHIFT: { flags: '-s, --shift <shift>', description: 'a shift' }
};

const OPTIONS = {
  INPUT: { flags: '-i, input [input]', description: 'an input file' },
  OUTPUT: { flags: '-o, --output [output]', description: 'an output file' }
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

module.exports = { ACTION, INIT, OPTIONS_REQUIRED, OPTIONS, alphabet };
