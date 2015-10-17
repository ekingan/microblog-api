//REQUIREMENTS
var express = require('express');
		app = express();
		bodyParser = require('body-parser');
		mongoose = require('mongoose');

//CONFIG
app.set('view engine', 'ejs');
app.use('/static', express.static('public'));
var db = require('./models/index.js');

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
//ROUTES:

app.get('/', function (req, res) {
	//db.Posts.find etc
	var posts = [ { postContent: 'hi'}, { postContent: '2'} ];//connect data base here
	res.render('index', {posts: posts});
});
app.post('/posts', function(req, res) {
	console.log(req.body);
	db.Post.create(req.body, function(err, post) {
		if(err) {
			console.log("error");
		}
		res.json(post);
	});
});
app.delete('/posts/:id', function(req, res) {
	console.log('the post id is ', req.params);
	db.Post.find();
});
app.get('/api/posts', function(req, res){
	res.json({post: 'hi'});
	//db.Post.find() find the object on db
});

var server = app.listen(3000, function(req, res){
	console.log("listening to port 3000");
});