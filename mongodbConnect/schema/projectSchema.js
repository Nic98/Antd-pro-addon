var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  pageId: {
    type: String,
    required: true,
    unique: true,
  },
  pageName: {
    type: String,
    required: true,
  },
  projectSchema: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: '0', // off online
  },
  creator: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = ProjectSchema;