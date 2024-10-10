/*
 * 后台请求封装，有可能是fetch 或者 super agent
 * 由于promise无法打断，这里就没有封装成promise，使用了类似jQuery的封装。
 * */
import Request from 'superagent'; //ajax客户端请求代理模块
import { message } from 'antd'
import * as _ from 'lodash';
//lodash是一套工具库，内部封装了很多字符串、数组、对象等常见数据类型的处理函数。

export default {
  /*
   * 外观模式
   * */
ajax(options) {
    let defaultOptions = {
        url: '',
        type: 'GET',
        headers: { Accept: 'application/json' },
        data: {},
        before() {
        },
        error(error) {
          console.error(error);
          message.error("请求有错误，请重试！");
        },
        success(res) {
          // console.log(res);
          // message.info(res.msg);
          
        },
        complete(error, res) {
        }
    };
    options = _.assign({}, defaultOptions, options);
    if (options.before() === false) {
      return false;
    }
    let request = null;
    switch (options.type.toUpperCase()) {
        case 'GET':
            request = Request.get(options.url).query(options.data);  //请求传递查询字符串
            break;
        case 'POST':
            // options.data._xsrf = '';// from cookie or input element
            request = Request.post(options.url);
            break;
        case 'PUT':
            request = Request.put(options.url);
            break;
        case 'DELETE':
            request = Request.del(options.url);
            break;
        default:
            throw Error('Unknow request type, the request type must be get or post ')
    }

    return request
        .send(options.data)
        .set('Accept', 'application/json')
        .end((error, res) => {
          error ? options.error(error) : options.success(res);
          options.complete(error, res);
        });
    },
    get(options) {
        options.type = 'GET';
        return this.ajax(options);
    },
    post(options) {
      options.type = 'POST';
      return this.ajax(options);
    },
    put(options) {
        options.type = 'PUT';
        return this.ajax(options);
    },
    delete(options) {
        options.type = 'DELETE';
        return this.ajax(options);
    }
}
