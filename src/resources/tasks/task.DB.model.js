const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// inDBModel
const taskSchema = new Schema({
  title: {
    type: String,
    default: 'TASK_TITLE'
  },
  description: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  userId: {
    type: String,
    default: ''
  },
  boardId: {
    type: String,
    default: ''
  },
  columnId: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('tasks', taskSchema);
