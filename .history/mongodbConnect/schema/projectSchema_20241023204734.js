var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  key : {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
})

module.exports = ProjectSchema;