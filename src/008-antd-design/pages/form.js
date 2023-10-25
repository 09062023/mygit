import React from "react";
import { Form, Input, Select } from "antd";
const Formed = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  return (
    <>
      <Form name="basic" form={form}>
        <Form.Item
          label="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="sex"
          name="sex"
          rules={[
            {
              required: true,
              message: "Please select your sex!",
            },
          ]}
        >
          <Select>
            <Option key="man">man</Option>
            <Option key="woman">woman</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please select your address!",
            },
          ]}
        >
          <Select>
            <Option key="shanxi">shanxi</Option>
            <Option key="zhejiang">zhejiang</Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default Formed;
