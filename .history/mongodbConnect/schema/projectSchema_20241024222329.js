var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  pageId: {
    type: String,
    required: true,
  },
  pageName: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
})

module.exports = ProjectSchema;