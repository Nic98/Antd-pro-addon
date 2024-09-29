## 使用和原理细节

* 安装webpack & webpack-cli
```
  npm i webpack --save-dev
  npm i webpack-cli --save-dev
```
* 给npm挂载webpack打包脚本指令
```
"scripts": {
    "build": "webpack --mode production"
}
```
* 使用Babel
* 为什么使用Babel
> React Component大多是用JS ES6语法来写的，而有些浏览器没办法运行ES6的语法，所以就需要工具来将ES6的代码转化成浏览器可以运行的代码（通常是es5的语法）
    webpack本身是不会做这件事情的，需要靠转换器：loader。
一个webpack loader作用就是把输入进去的文件转化成指定的文件格式输出。其中babel-loader负责将传入的es6文件转化成浏览器可以运行的文件。
babel-loader需要利用Babel，所以需要预先将Babel配置好。
babel-preset-env：将ES6的代码转成ES5(注意：babel-preset-es2015已经被废弃了)
babel-preset-react: 将JSX语法编译成JS
* 安装babel 依赖
```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```
* 配置babel规则 根目录文件夹里新建一个文件.babelrc
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

* 编写react组件(容器、展示)组件
>  简单来说: 容器跟展示组件是React组件的两种模式。
  **容器组件**: 一般比较重数据处理的逻辑会写在这，比如监听外界传入（例如redux） state的变化，或者处理组件内部的state，等等。
      **特点**:  有自己的state 渲染一个html表单

>  **展示组件**：顾名思义，就是仅仅用来展示的。它一般都是一个纯箭头函数，接受容器组件通过props传来的数据，然后展示我们希望展示的html结构
      **特点**:  

> **受控组件**: 容器组件通过props传给它，这种组件叫做controlled component。如Input
* 引入并安装react库 创建组件库文件夹
```
  npm i react react-dom --save-dev
  mkdir -p src/js/components/{container,presentational}
```
* 引入Prop Types，这样一来可以做输入的数据类型检测，二来别人用你的组件，可以很快知道这个组件需要什么input
```
npm i prop-types --save-dev
```
* 编写容器组件和展示组件
* 运行脚本webpack
需要在./src/index.js 里把bundle.js 遍历

>index.js
```
import FormContainer from "./js/components/FormContainer";
```

```
npm run build
```
> 会在根目录生成dist文件夹里生成bundle.js

* webpack产生html文件 去装载这个bundle.js文件来展示
```
npm i html-webpack-plugin html-loader --save-dev
更新webpack配置文件
```

* 使用anywhere去直接跑html容器文件
* webpack-dev-server
> webpack dev Server
目前为止，我们来遗留一个问题：每次修改文件的时候，都需要重新跑一次编译
npm run build
这样是很麻烦的，我们想达到的效果是自动重新编译。 达到这个目标很简单，只需要3行配置就可以启动运行一个开发服务器。
启动服务器之后webpack就会在浏览器里启动你的应用，而且当你修改保存代码之后，webpack dev server还会自动刷新浏览器的窗口。
在启动webpack dev server前，需要先安装npm i webpack-dev-server --save-dev
打开package.json 加入start script
```
"scripts": {
  "start": "webpack-dev-server --open --mode development",
  "build": "webpack"
}
```
>保存这个文件，最后在跑这个命令 npm start
你会在你的浏览器里看到你的应用。
接下来你可以随意修改一下文件内容，会看到webpack dev server会自动刷新浏览器窗口。


* webpack.config.js
>  这个webpack的配置很简单。意思就是所有以.js结尾的文件都会用babel-loader把ES6编译转化成ES5的文件。
>  同时它定义了输入文件的路径为 src/index.js，输出为dist/bundle.js。
>  webpack 4里这两行代码你不写也行，webpack会默认帮你加，但是为了代码可读性，我们还是把它加上。
>  配置完成之后，我们就可以开始写React 组件了。


* 挂载react-route功能框架页面 "react-router": "3.2.0", 比较好用
> npm i react-route --save
> 新建 src/page  &&  src/framework && src/entry
> entry 代表整个单页应用的入口
> framework/app  framework/container 容器页面app.jsx  container.jsx  Container在App内
> framework/error 错误页面
> framework/**Routes.jsx** 所有页面组件挂载到该文件下统筹
```import React,{ Component,PropTypes } from 'react';
import {Router, Route, hashHistory, browserHistory, Link, IndexRoute} from 'react-router'
import App from './app/App.jsx';
// import Home from '../page/home/Home';
import Login from '../page/login/Login.jsx';
import Error404 from './error/Error404.jsx';
import Error401 from './error/Error401.jsx';
// import {Provider} from 'react-redux';
// import configureStore from '../reducers/store';
import pageRouts from '../page/RoutesCfg';

// const store = configureStore();

/*
 * 根据菜单数据，初始化路由
 * */
const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Login },
  childRoutes: pageRouts
};
/*
 * 所有未截获的请求,统一跳转到Error404组件
 * */
routes.childRoutes.push(

  { path: '/401', component: Error401 },
  { path: '*', component: Error404 }
);

export default class Routes extends Component {
  render() {
    // return (
    //   <Provider store={store}>
    //     <Router routes={routes} history={hashHistory}/>
    //   </Provider>
    // );
    return (
        <Router routes={routes} history={hashHistory}/>
    );
  }
}

```
> page / **RoutesCfg.js**
```
import React from 'react';
// import Good from './goods/GoodsList';
import Login from './login/Login.jsx';
let routes = [
  // { path: '/goods', component: Good },
  { path: '/login', component: Login },
]
// 逻辑控制页面 是否允许 访问某些页面
routes.forEach(item => {
  item.onEnter = function(nextState, replace) {
    let auth = window._USERINFO.auth;
    if (auth) {
      console.log(111 ,nextState);
      let pathname = nextState.location.pathname;
      let isAuth = false;
      auth.forEach(item => {
        if ((pathname.indexOf("/goods/view/")>-1) || (pathname.indexOf("/goods/edit/")>-1)){
          if ((item.oper_href.indexOf("/goods/view/")>-1) || (item.oper_href.indexOf("/goods/edit/")>-1)){
            isAuth = true;
          }
        }else if (item.oper_href === '/client' + pathname) {
          isAuth = true;
        }
      });

      // 设置为true
      isAuth = true;

      if (!isAuth) {
         replace({
          pathname: '/401',
          state: { nextPathname: nextState.location.pathname }
        })
      }
    }
  }
});



export default routes;

```


* 配置webpack CSS LESS 图片 等支持
extract-text-webpack-plugin 把CSS文件分离出来
```
npm i less css-loader less-loader url-loader extract-text-webpack-plugin --save-dev
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/main.css');
module.exports = {
    entry: './src/entry/index.jsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
             test: /\.css$/,
             use : extractCSS.extract([
                 {
                         loader: 'css-loader',
                         options: {
                                 sourceMap: true,
                         }
                 }
             ])
           },
          {
             test: /\.less$/,
             use: extractCSS.extract([{
                 loader: 'css-loader'
             }, {
                 loader: 'less-loader',
                 options:  { javascriptEnabled: true }
             }])
         },
         {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: [
              {
                    loader: "url-loader",
                    options: {
                      name: "[name].min.[ext]",
                      limit: 20000, // size <= 20KB
                      publicPath: '../static/',
                      outputPath: "static/"
                    }
                  }
                ]
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        title: 'Raines Project',
        template: "./src/index.html",
        filename: "./index.html"
      }),
      extractCSS
    ]
};
```











* 单页应用详解
```



Route
A
Route
 - A1
 Route
 - A2


 A1没权限  - > login - > 404 Route 怎么跳 授权, 安全性检查 TOKEN是否过期


后台单页REACT应用路由怎么组织层级并渲染?

wepack.config.js
   1: entry字段:   如 src/entry/index.JSX
   2: entry/index.jsx 去渲染(通过挂载根目录的ID index.html里的和这里的 framework)被react-router包装过的React组件
   ```
  ```
   import Routes from '../framework/Routes.jsx';
   import React from 'react';
   import ReactDOM from 'react-dom';

   ReactDOM.render(<Routes />, document.getElementById('framework'));
   ```
   3: Routes.jsx 去把 已经写好的权限分离或特殊处理过的路由 遍历进来, 并做一些特殊页面处理的跳转如404

   import pageRouts from '../page/RoutesCfg';
   /*
    * 根据菜单数据，初始化路由
    * */
   const routes = {
     path: '/',
     component: App,
     indexRoute: { component: Login },
     childRoutes: pageRouts
   };
   /*
    * 所有未截获的请求,统一跳转到Error404组件
    * */
   routes.childRoutes.push(
     { path: '/401', component: Error401 },
     { path: '*', component: Error404 }
   );

   export default class Routes extends Component {
     render() {
       return (
           <Router routes={routes} history={hashHistory}/>
       );
     }
   }


   4: 已经写好的权限分离或特殊处理过的路由, RoutesCfg.js 就是单纯的路由的逻辑处理, 比如是否可见,
      他是一段JS代码, 也是导出一组携带路由对象信息的 数组对象, 它和react-router一点关系没有.

```

* react redux
https://github.com/kenberkeley/redux-simple-tutorial
https://juejin.im/post/5ad207136fb9a028df230e84
