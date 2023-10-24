import React from "react";
import { Button, Modal, Input, Form } from "antd";
export default function App() {
  const onOk = () => {
    alert("sucessful");
    console.log("GOOD");
  };
  return (
    <div>
      <Button
        onClick={() => {
          Modal.confirm({
            content: (
              <Form>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            ),
            onOk: () => {
              onOk();
            },
            // onOk: onOk(),
            /**上面两种onOk是两个不同的方式，上面会按照理想的执行顺序进行执行
             * 下面这种会在点击事件触发时先执行OnOk函数，达不到预期的效果
             */
          });
        }}
      >
        click
      </Button>
    </div>
  );
}
