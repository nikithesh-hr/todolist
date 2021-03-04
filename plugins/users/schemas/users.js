"use strict";

const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
const { Schema } = mongoose;

 

//Define a schema
const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true }
 
});

module.exports = mongoose.model("users", schema);
