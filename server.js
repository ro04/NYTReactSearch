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

// Database Dependencies
var mongoose = require("mongoose");
var Promise = require("bluebird");

mongoose.Promise = Promise;

// Require Article Schema
var Article = require("./server/models/Article");

// Database configuration with mongoose
//mongoose.connect("mongodb://localhost/nytreactsearch", {
mongoose.connect("mongodb://heroku_wqk18zj3:uu2pd2lveluo4gb3dbhqvnsqe1@ds161041.mlab.com:61041/heroku_wqk18zj3", { 
  useMongoClient: true
});

var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// ===== Routes ===== //
 app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./client/index.html"));
});

// This is the route we will send GET requests to retrieve our most recent search data.
app.get("/api/save", function(req, res) {
    // We will find all the records, sort it in descending order, then limit the records to 5
    Article.find({}).sort([
        ["date", "descending"]
    ]).limit(5).exec(function(err, doc) {   
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

// This is the route we will send POST requests to save each search.
app.post("/api/save", function(req, res){
    Article.create({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    },function(err){
        if(err){
            console.log(err);
        }else{
            res.send("Saved Search");
        }
    });
});

app.post("/api/delete", function(req, res){
    Article.remove({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    }, function(err, removed){
        if(err){
            console.log(err);
        }
        else{
            res.send("Removed");
        }
    })
})

//app.use('/', routes);
//require('./server/config/routes')(app);

// EXPRESS MIDDLEWARE
app.use(function(err, res, next){
    res.status(err.status || 500);
});

app.listen(process.env.PORT ||PORT, function(){
    console.log("running at localhost " + PORT);
});