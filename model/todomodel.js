const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      User = require('./usermodel')


var taskSchema = new mongoose.Schema({ 
  task: String,
  status: String,
  users: { type: Schema.Types.ObjectId, ref:'User' }
   },
  {
    timestamps: true
  });

  var Task = mongoose.model('taskList', taskSchema);

module.exports = { Task }