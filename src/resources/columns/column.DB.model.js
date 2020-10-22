const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Column Schema */
const columnSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number
  }
});

module.exports = mongoose.model('columns', columnSchema);
