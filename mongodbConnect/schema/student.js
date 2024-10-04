var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({

    stu_id: {
        type: String
    },
    seq: {
        type: Number,
        default: 0
    },
    stu_name: {
        type: String,
        'default': ''
    },
    createDate: { // 建档日期
        type: Date,
        'default': Date.now
    },
});

module.exports = StudentSchema;
