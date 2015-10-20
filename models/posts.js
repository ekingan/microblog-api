var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comments.js');

var postSchema = new Schema({
	content: String,
	comments: [{type: Schema.Types.ObjectId, ref: 'Comments'}] // Comment
});	

var Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;
//module.exports = require('./comments.js');