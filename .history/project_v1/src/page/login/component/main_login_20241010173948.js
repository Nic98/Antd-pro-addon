import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router';
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Tabs,
    message
} from 'antd';
import Ajax from '../../../utils/ajax';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
@ant-design/compatible
export class LoginMainComponent extends Component {

      state = {
          userName: '',
          password: '',
      };

        handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                console.log('Received values of form 或者 state: ', values, this.state);
                // do ajax 请求发送
                // 服务端nodejs express服务和 数据库服务就应该开启  约定好相对应的 mapping （映射）url
                // cors options https://blog.csdn.net/sinat_23156865/article/details/81106710
                Ajax.post({
                    url: 'http://127.0.0.1:3000/user/login',
                    data: {
                        userName: this.state.userName,
                        password: this.state.password
                    },
                    error() {
                        message.error('error please');
                        window.location.href = "#/login";
                    },
                    success(res) {
                        const result = res.body;
                        console.log(result);
                        if (result.code === "200") {
                            message.success("登录成功，欢迎您！");
                            window.location.href = "#/home";
                        } else {
                            message.warning(result.msg || "登录失败，请重试！");
                            window.location.href = "#/login";
                        }
                    }
                })
            }
        });
    }

  	render() {
  		let {prefixCls,...props} = this.props;
		  const { getFieldDecorator } = this.props.form;
    	return (
    	   <div className={`${prefixCls}-main`}>
    	   	<div className={`${prefixCls}-main-form`}>
	           <Tabs className={`${prefixCls}-main-tabs`}>
	        		<TabPane tab="登录" key="1">
                        <Form onSubmit={this.handleSubmit} className={`$f{prefixCls}-form`}>
                            <FormItem>
	                                {getFieldDecorator('userName', {

                                    rules: [{ required: true, message: 'Please input your username!' }],
                                    initialValue: (this.props.login && this.props.login.userName) || ''
                                })(
                                    <Input className={`${prefixCls}-form-ipt`}
                                           onChange={(e) => {
                                                this.setState({
                                                        userName: e.target.value
                                                });
                                           }}
                                           prefix={<Icon type="user"
                                                         style={{ color: 'rgba(0,0,0,.25)' }} />}
                                           type="username" placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('userPassword', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input className={`${prefixCls}-form-ipt`}
                                            onChange = {
                                                (e) => {
                                                    this.setState({
                                                        password: e.target.value
                                                    });
                                                }
                                            }
                                            prefix={<Icon type="lock"
                                                         style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password" placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
	        		</TabPane>
	      		</Tabs>
      		</div>
      		</div>
    	)
  	}
}
const LoginForm = LoginMainComponent;

export default LoginForm;
