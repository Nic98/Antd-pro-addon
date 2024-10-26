var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  key : {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
  },
  avatar: {
    type: String,
  },
  
})