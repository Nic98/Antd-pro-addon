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
  schema: {
    type: String,
    required: true,
  },
  status: {}
})

module.exports = ProjectSchema;