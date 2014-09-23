var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//define todo's schema
var todoSchema = new Schema({
	text: String
});

//export the model
module.exports = mongoose.model('Todo', todoSchema);
