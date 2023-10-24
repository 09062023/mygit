import { Modal, Form, Input, InputNumber } from "antd";
import { React, useEffect } from "react";
/**因为values是父组件传来的值，用props接受，所以外部不可以改变，类似于const一个数组的思路 */
export default function Text(props) {
  const { isModalOpen, close, values, getChildValues } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(values);
    // console.log("123");
  }, [values, form]);
  return (
    <>
      <Modal
        forceRender
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          form
            .validateFields()
            .then((value) => {
              const a = Object.assign(values, value);
              //   console.log(a);
              getChildValues(a);
              // console.log(value);
              close(false);
              form.resetFields();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        onCancel={() => {
          close(false);
        }}
      >
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
