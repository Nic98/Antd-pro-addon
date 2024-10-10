import React, { useState } from 'react';
import { Form, Input, Button, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Ajax from '../../../utils/ajax';

const { TabPane } = Tabs;

const LoginMainComponent = ({ prefixCls, login }) => {
  const [form] = Form.useForm();
  const [userName, setUserName] = useState(login?.userName || '');
  const [password, setPassword] = useState('');

  const handleSubmit = async (values) => {
    try {
      console.log('Received values of form 或者 state: ', values, { userName, password });
      const res = await Ajax.post({
        url: 'http://127.0.0.1:3000/user/login',
        data: {
          userName,
          password
        }
      });

      const result = res.body;
      console.log(result);
      if (result.code === '200') {
        message.success("登录成功，欢迎您！");
        window.location.href = "#/home";
      } else {
        message.warning(result.msg || "登录失败，请重试！");
        window.location.href = "#/login";
      }
    }
  };

  return (
    <div className={`${prefixCls}-main`}>
      <div className={`${prefixCls}-main-form`}>
        <Tabs className={`${prefixCls}-main-tabs`}>
          <TabPane tab="登录" key="1">
            <Form form={form} onFinish={handleSubmit} className={`${prefixCls}-form`}>
              <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
                initialValue={userName}
              >
                <Input
                  className={`${prefixCls}-form-ipt`}
                  onChange={(e) => setUserName(e.target.value)}
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              </Form.Item>
              <Form.Item
                name="userPassword"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  className={`${prefixCls}-form-ipt`}
                  onChange={(e) => setPassword(e.target.value)}
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginMainComponent;