import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Tabs, message } from 'antd';
import Ajax from '../../../utils/ajax';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class RegisterMainComponent extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // do ajax 请求发送
        // 服务端nodejs express服务和 数据库服务就应该开启  约定好相对应的 mapping （映射）url
        // cors options https://blog.csdn.net/sinat_23156865/article/details/81106710
        Ajax.post({
          url: 'localhost:3000/user/register',
          data: {
            userName: values.userName,
            password: values.userPassword
          },
          error() {
            message.error('error please');
            window.location.href = "#/login";
          },
          success(res) {
            const result = res.body;
            console.log(result);
            if (result.code === "200") {
              message.success("注册成功，欢迎您！");
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

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('userPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    let { prefixCls, ...props } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className={`${prefixCls}-main`}>
        <div className={`${prefixCls}-main-form`}>
          <Tabs className={`${prefixCls}-main-tabs`}>
            <TabPane tab="注册" key="1">
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="账号"
                  name="userName"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input type="username" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="密码"
                  name="userPassword"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input type="password" />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="确认密码"
                  name="confirm"
                  rules={[{ required: true, message: 'Please confirm your password!' }]}
                >
                  <Input type="password" onBlur={this.handleConfirmBlur} />
                </FormItem>
                {/* <FormItem {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox>已经阅读协议</Checkbox>
                  )}
                </FormItem> */}
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const RegisterForm = RegisterMainComponent;

export default RegisterForm;
