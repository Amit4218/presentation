const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING); // connectiing with mongodb

// Define the schema
const userSchema = mongoose.Schema({
  UserName: String,
  Registration: String,
  Course: String,
  Semester: String,
});

// Create and export the model
module.exports = mongoose.model("user", userSchema);
