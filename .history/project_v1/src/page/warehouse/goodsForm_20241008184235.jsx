import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';

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

const goodsForm = ({ OnAddGoods }) => {

  return (
    <Form
      {...formItemLayout}
      style={{
        maxWidth: 600,
      }}
      onFinish={OnAddGoods}
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
        label="Status"
        name="status"
        rules={[
          {
          required: true,
          message: 'Please input!',
          },
        ]}
      >
        <Select
          defaultValue="Running"
          style={{ width: 120 }}
          options={[
            { value: '1', label: 'Running' },
            { value: '2', label: 'Online' },
            { value: '3', label: 'Error' },
            { value: '0', label: 'Closed' },
          ]}
        />
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