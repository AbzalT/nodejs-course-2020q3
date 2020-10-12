module.exports = error => {
  console.log(error.message ? error.message : error);
  process.exitCode = 1;
  // process.exit(1);
};
