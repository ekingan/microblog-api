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

// print all comments to terminal
console.log('all comments:');
db.Comments.find({}, function(err, comments) {
	for(var i=0; i<comments.length; i++) {
		console.log(comments[i]);
	}
});

// // make fake data
// db.Posts.findOne({}, function(err, post){
// 	var newComment = {content: 'hi'};
// 	db.Comments.create(newComment, function(err, newComment) {
// 		post.comments.push(newComment);
// 		post.save();		
// 	});

// });



//ROUTES:

//RENDER INDEX
app.get('/', function (req, res) {
	db.Posts.find({}).populate('comments').exec(function(err, posts) {
		if (err) { console.log("error getting all posts"); }

		res.render('index', {posts: posts});
	});
});

//POST route for posts
app.post('/api/posts', function(req, res) {
	db.Posts.create(req.body, function(err, post) {
		if(err) {
			console.log("error");
		}
		res.json(post);
	});
});

//POST route for comments
app.post('/api/posts/:id/comments', function(req, res) {
	db.Posts.findById(req.params.id, function(err, post) {
		var comment = req.body.comment;
       post.comments.push(comment);
       post.save(function(err){
           res.json(comment);
       });
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
//DELETE route for comments
app.delete('/api/posts/:id/comments', function(req,res){
	var postId = req.params.postId;
	var commentId = req.params.id;
	db.Posts.findOneAndRemove({_id: commentId}, function (err, data){
		if(err) {
			console.log('err deleting post');
		}	res.json(data); 
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

//GET route for new comments
app.get('/api/posts/:id/comments', function(req, res){
	db.Comments.find(req.params.id, function(err, posts){
		res.json(posts);
	});
});

//LISTEN
var server = app.listen(3000, function(req, res){
	console.log("listening to port 3000");
});