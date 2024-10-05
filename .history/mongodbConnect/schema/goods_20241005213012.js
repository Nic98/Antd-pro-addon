var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoodsSchema = new Schema({

    goodsId: {
        type: String

    },
    seq: {
        type: Number,
        default: 0
    },
    goodsName: {
        type: String,
        'default': ''
    },
    createDate: { // 建档日期
        type: Date,
        'default': Date.now
    },
});

module.exports = GoodsSchema;
