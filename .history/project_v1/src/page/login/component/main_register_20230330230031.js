// React Component
import React,{ Component,PropTypes } from 'react'
// import { bindActionCreators } from 'redux';    
// import { connect } from 'react-redux';
import * as LoginAction from '../../../actions/login';
import Ajax from '../../../utils/ajax';

import { Tabs, Form, Input, Rate, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const TabPane = Tabs.TabPane;

export class RegisterMainComponent extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && values.agreement) {
        console.log('Received values of form: ', values);
        // const { loginAction: { userRegister } } = this.props;
        // userRegister(values);
        Ajax.post({
          url: 'http://127.0.0.1:3000/user/register',
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
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    let {prefixCls,...props} = this.props

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
                <Form.Item
                  {...formItemLayout}
                  label="账号"
                >
                  {getFieldDecorator('userName', {
                    rules: [{
                      required: true, message: 'Please input your Username!',
                    }],
                  })(
                    <Input type="username" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="密码"
                >
                  {getFieldDecorator('userPassword', {
                    rules: [{
                      required: true, message: 'Please input your password!',
                    }, {
                      validator: this.validateToNextPassword,
                    }],
                  })(
                    <Input type="password" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout} 
                  label="确认密码"
                >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }, {
                      validator: this.compareToFirstPassword,
                    }],
                  })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                  })(
                    <Checkbox>已经阅读协议</Checkbox>
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">注册</Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
      );
    }
};

const RegisterForm = Form.create()(RegisterMainComponent);

export default RegisterForm;
