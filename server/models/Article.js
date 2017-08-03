// The model basically defines all fields we want to collect
// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

//Create ArticleSchema 
var ArticleSchema = new Schema({
  title: {
        type: String,
        required: true
  },

  date: {
    type: String,
    required: true
  },
    url: {
    type: String,
    required: false
  },

});

// Save the "Article" model using the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

//Export the Magazine model
module.exports = Article;