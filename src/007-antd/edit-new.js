import React, { useEffect } from "react";
import { Modal, Form, Select, Input } from "antd";
export default function EditNew(props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { isModalOpen, close, value1, getchild } = props;
  useEffect(() => {
    form.setFieldsValue(value1);
  }, [value1, form]);
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
              const info = Object.assign(value1, value);
              console.log(value, info);
              getchild(info);
              form.resetFields();
              close(false);
            })
            .catch((err) => {
              console.log(err);
              alert("请按规则输入");
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
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Platform"
            name="platform"
            rules={[{ required: true, message: "Please select your platform" }]}
          >
            <Select>
              <Option value="iOS">iOS</Option>
              <Option value="Android">Android</Option>
              <Option value="Harmony">Harmony</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Creator"
            name="creator"
            rules={[{ required: true, message: "Please select creator" }]}
          >
            <Select placeholder="请选择创建者">
              <Option value="Jack">Jack</Option>
              <Option value="HuaWei">HuaWei</Option>
              <Option value="LeiJun">LeiJun</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
