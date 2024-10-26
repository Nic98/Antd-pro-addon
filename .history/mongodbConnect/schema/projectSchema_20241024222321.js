var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  pageId: {
    
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