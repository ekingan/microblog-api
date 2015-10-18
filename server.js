//REQUIREMENTS
var express = require('express');
		app = express();
		ejs = require('ejs');
		bodyParser = require('body-parser');
		mongoose = require('mongoose');
		db = require('./models/index.js');
		//Post = require('./models/post.js');

//CONFIG
app.set('view engine', 'ejs');
//serve js and css files
app.use('/static', express.static('public'));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
//CONNECT MONGOOSE
mongoose.connect('mongodb://localhost/microblog-api');




//ROUTES:

//RENDER INDEX
app.get('/', function (req, res) {
	db.Posts.find({}, function(err, posts) {
		if (err) {
			console.log("error getting all data from data base");
		}
	//var posts = [ { postContent: 'hi'}, { postContent: '2'} ];//connect data base here
	res.render('index', {posts: posts});
		});
});

//POST route for posts
app.post('/posts', function(req, res) {
	console.log(req.body);
	db.Posts.create(req.body, function(err, posts) {
		if(err) {
			console.log("error");
		}
		res.json('index', {posts: posts});
	});
});

//DELETE route for new posts
app.delete('/posts/:_id', function(req, res) {
	console.log('the post id is ', req.params);
	db.Posts.findOne( {_id: req.params._id} , function (err, posts) {
		if (err) {
			console.log("Error deleting post");
		}
		db.Post.remove(function (err){
			res.json('index', {posts: posts});
		});
		});
});

// // GET route for posts
// app.get('/posts', function(req, res){
// 	db.Posts.find({}, function(err, posts){
// 		if (err) {
// 			console.log("error getting posts");
// 		}
// 		res.json('index', {posts: posts});
// 	});
	
	
// });

//LISTEN
var server = app.listen(3000, function(req, res){
	console.log("listening to port 3000");
});