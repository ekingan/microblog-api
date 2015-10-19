//REQUIREMENTS
var express = require('express');
		app = express();
		ejs = require('ejs');
		path = require('path');
		bodyParser = require('body-parser');
		mongoose = require('mongoose');
		db = require('./models');

		

//CONFIG
app.set('view engine', 'ejs');
//serve js and css files
app.use('/static', express.static('public'));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//CONNECT MONGOOSE
mongoose.connect('mongodb://localhost/microblog-api');





//ROUTES:

//RENDER INDEX
app.get('/', function (req, res) {
	db.Posts.find({}, function(err, posts) {
		if (err) {
			console.log("error getting all posts");
		}
			db.Comments.find({}, function(err, comments){
				if (err){
					console.log("error getting all the comments");
				}
			
	res.render('index', {posts: posts, comments: comments});
	console.log({});
			});
		});
});

//POST route for posts
app.post('/api/posts', function(req, res) {
	db.Posts.create(req.body, function(err, posts) {
		if(err) {
			console.log("error");
		}
		res.json(posts);
	});
});

//POST route for comments
app.post('/api/comments', function(req, res) {
	db.Posts.create(req.body, function(err, commentss) {
		if(err) {
			console.log("error");
		}
		res.json(comments);
	});
});

//DELETE route for new posts
app.delete('/api/posts/:_id', function(req, res) {
	console.log('the post id is ', req.params._id);
	db.Posts.remove( {_id: req.params}, function (err, posts) {
			console.log("post deleted");
			res.json(posts);
		});
		
});

// GET route for posts
app.get('/api/posts', function(req, res){
	db.Posts.find({}, function(err, posts){
		if (err) {
			console.log("error getting posts");
		}
		res.json(posts);
	});
	
	
});

//LISTEN
var server = app.listen(3000, function(req, res){
	console.log("listening to port 3000");
});