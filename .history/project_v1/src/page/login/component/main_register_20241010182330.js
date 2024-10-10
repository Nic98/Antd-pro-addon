import React from 'react';
import { Form, Input, Button, message } from 'antd';
import Ajax from 'some-ajax-library'; // Replace with actual import

const RegisterForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      console.log('Received values of form: ', values);
      const res = await Ajax.post({
        url: 'http://localhost:3000/user/register',
        data: {
          userName: values.userName,
          password: values.userPassword
        }
      });

      const result = res.body;
      console.log(result);
      if (result.code === "200") {
        message.success("注册成功，欢迎您！");
        window.location.href = "#/home";
      } else {
        message.warning(result.msg || "登录失败，请重试！");
        window.location.href = "#/login";
      }
    } catch (error) {
      message.error('error please');
      window.location.href = "#/login";
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="userName"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="userPassword"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;