var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	content: String
});	

var Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;