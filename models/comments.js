var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	content: String
});	

var Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;