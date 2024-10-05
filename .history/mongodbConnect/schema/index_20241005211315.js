var path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var root = path.resolve(__dirname, '..');
mongoose.connect('mongodb://localhost:27017/oa', {user: '', pass: '' }); // 连接库

// 监测实例化连接对象
const connection = mongoose.connection
connection.on('error', console.error.bind(console, '连接错误：'))
connection.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})


//遍历所有表名结构 schema IO NODEJS
fs.readdirSync(path.resolve(root, 'schema')).forEach(function (name) { // 遍历所有schema，目前暂时没有2级目录
    const prefix = path.basename(name, '.js'); // 前缀
    const suffix = path.extname(name);  // 后缀
    if (prefix !== 'index' && suffix === '.js') {
        M[prefix] = mongoose.model(prefix, require('./' + name)); // 连接表
    }
});
