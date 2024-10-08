import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import { updateGoods } from '../../services/goodsServices.js';

const GoodsUpdateForm = ({ visible, onClose, goods, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(goods);
    }
  }, [visible, goods, form]);

  const handleFinish = async (values) => {
    await updateGoods(goods._id, values);
    onUpdate();
    onClose();
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="desc" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="callNo" label="Call No" rules={[{ required: true, message: 'Please input the call number!' }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
        <Select>
          <Select.Option value="0">Closed</Select.Option>
          <Select.Option value="1">Running</Select.Option>
          <Select.Option value="2">Online</Select.Option>
          <Select.Option value="3">Error</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Update</Button>
        <Button onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default GoodsUpdateForm;
