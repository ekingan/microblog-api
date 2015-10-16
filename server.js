//REQUIREMENTS
var express = require('express');
		app = express();
		bodyParser = require('body-parser');
		mongoose = require('mongoose');

//CONFIG
app.set('view engine', 'ejs');
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
//ROUTES:

app.get('/', function (req, res) {
	
	res.render('index', {});
});


var server = app.listen(3000, function(req, res){
	console.log("listening to port 3000");
});