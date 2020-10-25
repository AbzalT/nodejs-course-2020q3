const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// inDBModel
const boardSchema = new Schema({
  title: {
    type: String,
    default: 'BOARD_TITLE'
  },
  columns: [{}]
});

module.exports = mongoose.model('boards', boardSchema);
