import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
const Edited = (props) => {
  const { isModalOpen, close, value, getchild } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(value);
  }, [value, form]);
  return (
    <>
      <Modal
        forceRender
        title="编辑"
        open={isModalOpen}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              console.log(values);
              //在这里合并对象
              const a = Object.assign(value, values);
              getchild(a);
              close(false);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        onCancel={() => {
          close(false);
        }}
      >
        <Form form={form}>
          <Form.Item
            label="Name"
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
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edited;
