const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/main.css');

module.exports = {
    externals: {
        "react": "var window.React",
        "react-dom": "var window.ReactDOM",
        "prop-types": "var window.PropTypes",
        "@alifd/next": "var window.Next",
        "@alilc/lowcode-engine": "var window.AliLowCodeEngine",
        "@alilc/lowcode-engine-ext": "var window.AliLowCodeEngineExt",
        "moment": "var window.moment",
        "lodash": "var window._"
    },
    //构建内部依赖图的起点
    entry: './src/entry/index.jsx',
    //输出它所创建的bundles
    //多个入口时，filename:'[name].js' 进行匹配输出
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            framework: path.resolve(__dirname,'src/framework'),
            components: path.resolve(__dirname,'src/components'),
            page: path.resolve(__dirname,'src/page')
        }
    },
    //配置loader去预处理import或者require等加载进来的所有类型模块，方便webpack进行打包
    // html html-loader  css sass less css-loader js babel-loader url/file file/url - loader
    module: {
        rules: [
            //html文件处理
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            //js处理
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query:{
                    plugins: [
                        [  "import",{libraryName: "antd", style: 'css'}] // antd按需加载
                    ]
                },
            },
            //jsx语法的处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query:{
                    plugins: [
                        [  "import",{libraryName: "antd", style: 'css'}] // antd按需加载
                    ]
                },
            },
            //css文件处理
            {
                test: /\.css$/,
                use: extractCSS.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true  //开启css的source map
                        }
                    }
                ])
            },
            //less文件处理
            {
                test: /\.less$/,
                use: extractCSS.extract([
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true   //对css中的js进行解析
                        }
                    }
                ])
            },
            {
            // 增加对 SCSS 文件的支持
            test: /\.scss$/,
                // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
            use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            //图片的处理
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 20000,  //20KB
                            name: '[name].min.[ext]',
                            publicPath: '../static/',
                            outputPath: 'static/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '后台系统',
            template: './src/index.html',
            filename: './index.html'
        }),
        extractCSS
    ]
};
