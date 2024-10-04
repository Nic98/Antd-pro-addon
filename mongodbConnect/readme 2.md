
* nodejs 下操作数据库
> mysql -> sequelize库
> mongodb -> mongoose库

* mysql mongodb 简单的概念区分
> 表 -	集合 - schema - table -collection
   行	- 文档 - row - document
   列	- 字段 - col - field
  joins	- 嵌入文档或者链接
  MongoDB 27017  mysql 3306

win 7 底下安装mongodb
http://www.runoob.com/mongodb/mongodb-window-install.html
https://segmentfault.com/a/1190000004868504

* robomongo 作为mongodb 可视化操作界面软件

* navicat 作为mysql 可视化操作界面软件


## nodejs + express + mongoose 操作
* express 创建服务器
> npm i express express-generator -g
> express -e mongoose_crud  “-e”表示使用ejs作为模版引擎
> cd mongoose_crud && npm install
*  npm install supervisor -g // 热更新nodejs 就不用每次编写代码都中断 重新启动 hotreload 的概念
  ```
  package.json 中配置启动项 以后要启动项目只需要在项目文件夹下，执行npm start即可。
  "scripts": {
        "start": "supervisor ./bin/www"
    },
  ```
* 启动工程 npm start 查看是否展示 ' Welcome to Express ' 默认是3000端口校验是否成功

* 安装 **mongoose**  
>  npm i mongoose --save

* 根目录下创建 schema 文件夹代表连接和表结构模块
 schema
    -- index.js
    -- goods.js
```
index.js
var
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var root = path.resolve(__dirname, '..');
mongoose.connect('mongodb://localhost:27017/oa', {user: '', pass: '' }); // 创建链接

// 实例化连接对象
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接错误：'))
db.once('open', (callback) => {
  console.log('MongoDB连接成功！！')
})

// 遍历所有表名结构 schema
fs.readdirSync(path.resolve(root, 'schema')).forEach(function (name) { // 遍历所有schema，目前暂时没有2级目录
    const prefix = path.basename(name, '.js'); // 前缀
    const suffix = path.extname(name);  // 后缀
    if (prefix !== 'index' && suffix === '.js') {
        M[prefix] = mongoose.model(prefix, require('./' + name));
    }
});

console.log(M);
```
* .find()，作为读取、查找信息用。
.create()，作为增加信息用。它是基于mongoose中的model的操作，传入一个json对象作为需要添加的内容，具体可自行查阅。
.update()，作为更新信息用。
.remove()，作为删除信息用。

* 上述方法最后一个参数均为回调 可以用async await co 优化解决

* **目录结构如下**

```
localhost:mongoose_crud didi$ tree -I node_modules --dirsfirst
.
├── bin
│   └── www
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
├── schema
│   ├── goods.js
│   └── index.js
├── views
│   ├── error.ejs
│   └── index.ejs
├── app.js
├── package-lock.json
└── package.json
```
