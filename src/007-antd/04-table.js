import { Table, Space, Button, Modal, Form, Input, InputNumber } from "antd";
import React, { useState } from "react";
var length = 46;

// allListId = [1, 2, 3, 4, 5, 6];
// deleteListId = [2, 3, 5];
// arr = allListId.filter((el) => !deleteListId.includes(el));

const data = [];
for (let i = 0; i < length; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const Tables = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataList, setDataList] = useState([...data]);
  const onSelectChange = (newSelectedRowKeys) => {
    //console.log("selectedRowKeys changed: ", newSelectedRowKeys, record);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (text, record, index) => {
        return (
          <Space size={10}>
            <Button
              onClick={() => {
                console.log(index);
                let arr = dataList.filter((item, ind) => index !== ind);
                setDataList(arr);
              }}
            >
              删除
            </Button>

            <Button
              onClick={() => {
                Modal.confirm({
                  content: (
                    <Form name="edit" form={form}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
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
                          },
                        ]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Form>
                  ),
                });
              }}
            >
              编辑
            </Button>
          </Space>
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <>
      <Space size={8}>
        <Button
          type="primary"
          onClick={() => {
            length++;
            console.log(length);
            let newList = [...dataList]; //内存地址的原因
            newList.unshift({
              key: length - 1,
              name: `Edward King ${length - 1}`,
              age: 32,
              address: `London, Park Lane no. ${length - 1}`,
            });
            setDataList(newList);
            // console.log([
            //   {
            //     dataList: newList,
            //   },
            // ]);
          }}
        >
          新增
        </Button>
        <Button
          type="primary"
          onClick={() => {
            let list = [...dataList];
            let arr = [];
            arr = list.filter((el) => !selectedRowKeys.includes(el.key));
            setDataList(arr);
            //console.log(arr);
            if (selectedRowKeys.length === 0) {
              alert("请选择要操作的数据");
            }
          }}
        >
          批量删除
        </Button>
        {/**下一步，批量处理操作 */}
      </Space>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataList}
      />
    </>
  );
};
export default Tables;
