var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoodsSchema = new Schema({

  key: {
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
  name: {
    type: String,
  },
  owner: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  callNo: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    // required: true,
  },
});

module.exports = GoodsSchema;
