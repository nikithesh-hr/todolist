"use strict";


const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
const { Schema } = mongoose;
const stat= ['open', 'completed', 'ongoing', 'cancelled'];
//Define a schema
const schema = new Schema({
  taskname: String,
  deadline: String,
  status : { type: String, enum: stat },
  visibility: { type: Boolean, required: false, default: true },
  user_id : { type: String, required: true }
});

module.exports = mongoose.model("taskdetails", schema);


