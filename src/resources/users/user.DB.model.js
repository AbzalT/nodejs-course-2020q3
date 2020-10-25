const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// inDBModel
const userSchema = new Schema({
  name: {
    type: String
  },
  login: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('users', userSchema);
