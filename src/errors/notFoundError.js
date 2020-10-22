class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.status = '404';
  }
}

module.exports = { /* NOT_FOUND_ERROR:  */ NotFoundError };
