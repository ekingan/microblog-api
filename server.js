var express = require('express');
var app = express();


app.get('/', function (req, res) {
	res.send("hello world");
});


var server = app.listen(3000, function(req, res){
	console.log("listening to port 3000");
});