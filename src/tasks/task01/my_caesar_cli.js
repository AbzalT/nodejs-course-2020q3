const { conversion } = require('./modules/conversion');
const { readConsole } = require('./modules/command');

conversion(readConsole());
