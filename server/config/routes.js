// DEPENDENCIES
var path = require('path');
//var router = require("express").Router();
var express = require('express');

var mongoose = require("mongoose");
var Promise = require("bluebird");

mongoose.Promise = Promise;

// Require Article Schema
var Article = require("../models/Article");

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/nytreactsearch", {
//mongoose.connect("mongodb://herokuhost/heroku_wqk18zj3:uu2pd2lveluo4gb3dbhqvnsqe1@ds161041.mlab.com:61041/heroku_wqk18zj3", { 
  useMongoClient: true
});

var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

module.exports = function(app) {
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../../client/index.html"));
    });

    // This is the route we will send GET requests to retrieve our most recent search data.
    app.get("/api/saved", function(req, res) {
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
    app.post("/api/saved", function(req, res){
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

    app.post("/api/saved", function(req, res){
        Article.remove({
            title: req.body.title,
            date: req.body.date,
            url: req.body.url
        }, function(err, removed){
            if(err){
                console.log(err);
            }
            else{
                //console.log(removed);
                res.send("Removed");
            }
        })
    })
};

