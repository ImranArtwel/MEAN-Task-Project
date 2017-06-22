/**
 * Created by artwe on 13/06/2017.
 */
const config = require('../config/database');
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

const Task = module.exports = mongoose.model('Task',taskSchema);

module.exports.addTask = function (task, callback) {
    task.save(task,callback);
}

module.exports.deleteTask = function (id,callabck) {

  Task.remove({_id: id},callabck);
}
