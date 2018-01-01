let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.connect.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');


module.exports = { mongoose };