import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
export default function EditSon(props) {
  const [form] = Form.useForm();
  const { isopen, close, cont, getchild1 } = props;
  useEffect(() => {
    form.setFieldsValue(cont);
  }, [cont, form]);
  return (
    <Modal
      forceRender
      title="修改子元素"
      open={isopen}
      onOk={() => {
        form
          .validateFields()
          .then((value) => {
            const info = Object.assign(cont, value);
            // console.log(value, info);
            getchild1(info);
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
          <Input placeholder="请输入子表的名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
