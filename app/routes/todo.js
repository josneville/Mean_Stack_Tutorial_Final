var Todo = require('../models/todo');

//combine all the functions together and export as a whole
module.exports = function(app){

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', getTodos);
	
	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res){
		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text: req.body.text,
		}, function(err, todo){
			if(err){
				res.send(400, err);	
				return;
			}
			// get and return all the todos after you create another
			getTodos(req, res);
		});
	});
	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todo){
			if(err){
				res.send(400, err);
				return;
			}
			// get and return all the todos after you create another
			getTodos(req, res);
		});
	});
		
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
}

function getTodos(req, res){
	// use mongoose to get all todos in the database
	Todo.find({}, function(err, todos){
		// if there is an error retrieving, send the error. nothing after res.send(err) 
		if(err){
			res.send(400, err);
			return;
		}
		res.send(200, todos); //return all todos in JSON format
	});
}
