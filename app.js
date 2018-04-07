'use strict';

var express = require("express");
var app = express();
var mainRoutes = require("./routes/main");
var apiRoutes = require("./routes/api");

var jsonParser = require("body-parser").json;
var logger = require("morgan");

const port = process.env.PORT || 5000;

app.set('view engine','pug');
app.use(express.static('public'));
app.use(logger("dev"));
app.use(jsonParser());

//database
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/qa");

var db = mongoose.connection;

db.on("error", function(err){
	console.log("connection error:", err);
});

//database
db.once("open", function(){
	console.log("db connection successful");
});
app.use(mainRoutes);
app.use("/questions", apiRoutes);

// Catch 404 and forward to error handler
app.use(function(req, res, next){
	var err = new Error("Not Found!");
	err.status = 404;
	next(err);
});

// Error handler
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

app.get("/", function(req, res, next){
	res.render('index');
});
/*var jsonCheck = function(req, res, next){
	if(req.body){
		console.log("The sky is", req.body.color);
	} else {
		console.log("There is no body propery on the request");
	}
	next();
}

app.use(jsonCheck);
app.use(jsonParser());
app.use(jsonCheck);

app.use(function(req, res, next){
	req.myMessage = "Hello, middleware #2";
	console.log("First piece of middleware");
	next();
});

app.use(function(req, res, next){
	console.log(req.myMessage);
	console.log("Second piece of middleware, ID:", req.params.id);
	next();
});

app.use(function(req, res, next){
	console.log("The leave on the trees are ", req.query.color);
	next();
});*/

app.listen(port, function(){
	console.log("Express server is listening on port "+port+"!!!");
});