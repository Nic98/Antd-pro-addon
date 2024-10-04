var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    userId: {
        type: String
    },
    userState: {
      type: String,
      'default': '1'    // 1代表正常用户 2代表吊销 3特权
    },
    userName: {
        type: String,
        'default': ''
    },
    userPassword: {
      type: String,
      'default': ''
    },
    createDate: { // 建档日期
        type: Date,
        'default': Date.now
    },
});

module.exports = UserSchema;
