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
  },
  desc: {
    type: String,
  },
  callNo: {
    type: Number,
  },
  status: {
    type: String,
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
  },
});

module.exports = GoodsSchema;
