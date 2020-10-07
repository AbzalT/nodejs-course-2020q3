function errorHandler(err) {
  if (err) {
    process.stderr.write(`${err.message}\n`);
    process.exit(1);
  }
}

module.exports = { errorHandler };
