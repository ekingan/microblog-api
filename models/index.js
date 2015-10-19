var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/posts');


//var model = require('Posts'); //not sure about this!
//var db = require("./models/posts.js"); //not sure



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
	console.log("db is open for business");

});

module.exports.Posts = require('./posts.js');
module.exports.Comments = require('./comments.js');