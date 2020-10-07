const fs = require('fs');
const { pipeline } = require('stream');
const stream = require('stream');
const { caesar } = require('./caesar');

let args = {};

const convert = new stream.Transform({ objectMode: true });

convert._transform = function (chunk, encoding, callback) {
  try {
    callback(null, caesar(chunk.toString(), args.shift, args.action));
  } catch (e) {
    callback(e);
  }
};

function conversion(_args) {
  args = { ..._args };
  const source = args.input ? fs.createReadStream(args.input) : process.stdin;
  const target = args.output
    ? fs.createWriteStream(args.output, { flags: 'a' })
    : process.stdout;
  pipeline(source, convert, target, err => {
    if (err) {
      process.stderr.write(`${err.message}\n`);
      process.exit(1);
    }
  });
}

module.exports = { conversion };
