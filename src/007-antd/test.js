import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import { lib } from "react-single-app";
export default function AddEdit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    lib.request({
      url: "/wga-admin/staff/page",
      success: (data) => {
        setList(data);
      },
    });
  }, []);
  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          console.log(list);
        }}
      >
        CLICK
      </Button>
      <Modal
        title="新增"
        open={isModalOpen}
        onOk={() => {}}
        onCancel={() => {}}
      >
        <Form labelAlign="right" labelCol={{ span: 4 }}>
          <Form.Item
            label="工号"
            name="workCardNo"
            rules={[
              {
                required: true,
                message: "请输入正确工号",
              },
            ]}
          >
            <Input placeholder="请输入工号" />
          </Form.Item>
          <Form.Item label="姓名" name="name" rules={[{ message: "姓名有误" }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ message: "请输入性别" }]}
          >
            <Select placeholder="请选择性别">
              <option>男</option>
              <option>女</option>
            </Select>
          </Form.Item>

          <Form.Item
            label="电话"
            name="mobile"
            rules={[{ message: "请输入电话" }]}
          >
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item
            label="出生年月"
            name="dateOfBirth"
            rules={[{ message: "请选择出生年月" }]}
          >
            <DatePicker
              renderExtraFooter={() => "extra footer"}
              picker="month"
              placeholder="请选择日期"
            />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name="no"
            rules={[{ message: "请输入身份证号" }]}
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>
          <Form.Item
            label="员工类型"
            name="staffTypeName"
            rules={[{ required: true, message: "请选择员工类型" }]}
          >
            <Select placeholder="请选择员工类型">
              <option>临时工</option>
              <option>长期工</option>
              <option>正式工</option>
              <option>周期工</option>
            </Select>
          </Form.Item>
          <Form.Item
            label="默认仓库"
            name="defaultWarehouseName"
            rules={[{ message: "请选择仓库" }]}
          >
            <Select placeholder="请选择仓库">{}</Select>
          </Form.Item>
          <Form.Item
            label="所属公司"
            name="companyName"
            rules={[{ message: "请选择所属公司" }]}
          >
            <Select placeholder="请选择所属公司">{}</Select>
          </Form.Item>
          <Form.Item
            label="计费类型"
            name="tipType"
            rules={[{ required: true, message: "请选择计费类型" }]}
          >
            <Select placeholder="请选择计费类型">{}</Select>
          </Form.Item>
          <Form.Item
            label="默认工种"
            name="defaultWorkTypeDesc"
            rules={[{ message: "请选择默认工种" }]}
          >
            <Select placeholder="请选择默认工种">{}</Select>
          </Form.Item>
          <Form.Item
            label="工牌ID"
            name="workCardNo"
            rules={[{ required: true, message: "请输入工牌ID" }]}
          >
            <Input placeholder="请输入工牌ID" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
