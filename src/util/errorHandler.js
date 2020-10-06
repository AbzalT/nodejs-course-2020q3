module.exports = error => {
  console.log(error.message ? error.message : error);
  process.exit(1);
};
