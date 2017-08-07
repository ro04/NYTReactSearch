// Dependencies
var path = require("path");
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");

// Set Port Number to Listen 
var PORT = 3000;

// Initialize Express
var app = express();

//var routes = require('./server/config/routes');

// Setting view engine to html
app.set("view engine", "html");
app.engine("html", function(path,options, callback){
    fs.readFile(path, "utf-8", callback);
});

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the client directory
app.use(express.static(path.join(__dirname, "client")));

// ===== Routes ===== //
//app.use('/', routes);
require('./server/config/routes')(app);

// EXPRESS MIDDLEWARE
app.use(function(err, res, next){
    res.status(err.status || 500);
});

app.listen(process.env.PORT ||PORT, function(){
    console.log("running at localhost " + PORT);
});