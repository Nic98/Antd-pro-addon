var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 前台前端的几个页面 - > 前端路由 -> 请求 - > 后端路由  -> 数据库的表 数据流 
// eq:  userAdd表格页面 -> userAdd.html -> /users/add -> /users/add -> users
//
var indexRouter = require('./routes/index');
var goodsRouter = require('./routes/goods');
var userRouter = require('./routes/user');
var studentRouter = require('./routes/student');
var projectSchemaRouter = require('./routes/projectSchema');


global.M = {}; // 声明全局数据库model实体表 简写M
require('./schema/index'); // 引用数据库 连接代码  = loadDBConnectAndTable()方法


// 1： JSONP script src xxx.js
// 2: ajax xhr, fetch, axios $.ajax promise(cors) cors


// fe(前端工程) - > ajax URL： alibaba / gateway ? dd.stu.listall /
//   - > 先走网关过滤器 gateway 服务 - > 到达真实的服务器 dd.stu.listall

var app = express();
 // 跨域CORS
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/goods', goodsRouter);
app.use('/user', userRouter);
app.use('/student', studentRouter);
app.use('/projectSchema', ); // 项目的数据库表
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
module.exports = app;
