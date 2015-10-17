var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
	content: String
});	

var Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;