import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from 'antd';

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const goodsForm = () => {
  const [componentVariant, setComponentVariant] = useState('filled');
  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };
  return (
    <Form
      {...formItemLayout}
      onValuesChange={onFormVariantChange}
      variant={componentVariant}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        variant: componentVariant,
      }}
    >

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="callNo"
        name="callNo"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <InputNumber
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name="desc"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Select
          // defaultValue="Running"
          style={{ width: 120 }}
          options={[
            { value: 'Running', label: 'status1' },
            { value: 'Error', label: 'status2' },
            { value: 'Closed', label: 'status3' },
            { value: 'Online', label: 'status4' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="DatePicker"
        name="DatePicker"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default goodsForm;