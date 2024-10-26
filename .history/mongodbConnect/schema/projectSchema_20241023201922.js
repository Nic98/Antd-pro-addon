var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  key : {
    type: Number,
    required: true,
  },
  name
})