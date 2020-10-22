const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Column = require('../columns/column.DB.model');
// inDBModel
const boardSchema = new Schema({
  title: {
    type: String,
    default: 'BOARD_TITLE'
  },
  columns: [{}]
  /* {
        ref: 'columns',
        type: [Schema.Types.ObjectId]
    } */
});

module.exports = mongoose.model('boards', boardSchema);
