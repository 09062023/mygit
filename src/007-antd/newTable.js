/**
 * ********功能**********
 * 1.设置子嵌套表格，同其他的项目一样，为其设置了批量删除，新增一条数据，点击删除
 * 2.点击编辑通过子父组件通信实现弹框的显示隐藏，并更改对应索引下的信息
 * 3.新增了状态，状态控制删除、编辑以及展开子嵌套表格的禁用状态
 * 4.给子嵌套表格同样设置了状态，会使得状态值发生改变
 * 5.子嵌套表格的编辑功能，点击子嵌套的edit，会通过组件通信打开弹框，实现修改
 */

/************************* */

/**
 * *****遗留问题******
 * 1.子嵌套表格抓取到对应父表格的key，但并未捕捉，造成0的1索引edit，1和2的1索引也跟着变化
 * 或者子状态设置为禁用，，其余的父组件对应的那一个也会显示禁用
 *
 * 如果此时子表格在父0位置新增一行数据，预计在父1和父2也会同时新增一行
 */

/**
 * 在父表格修改时，子组件文件是edit-new.js
 * 在子表格修改时，子组件文件时edit-son.js
 */
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table, Button, Switch } from "antd";
import React, { useState } from "react";
import EditNew from "./edit-new";
import EditSon from "./edit-son";
let length = 3;
let length2 = 3;
const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];
const data = [];
for (let i = 0; i < length2; i++) {
  data.push({
    key: i,
    date: "2014-12-24 23:12:00",
    name: "This is production name",
    upgradeNum: "Upgraded: 56",
    status1: true,
  });
}
const data1 = [];
for (let i = 0; i < length; i++) {
  data1.push({
    key: i,
    name: "Screem",
    platform: "iOS",
    version: "10.3.4.5654",
    status: true,
    upgradeNum: 500,
    creator: "Jack",
    createdAt: "2014-12-24 23:12:00",
  });
}
const NewTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listSon, setListSon] = useState(data);
  const [datalist, setdatalist] = useState(data1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value1, setvalue1] = useState();
  const [cont, setcont] = useState();

  const [isopen, setisopen] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // const onExpand = (expanded, record) => {
  //   console.log(expanded, record);
  // };
  const onExpandedRowsChange = (expandRows) => {
    console.log(expandRows);
  };
  const expandedRowRender = (record, num, indent, expanded) => {
    // console.log(record, num, indent, expanded);

    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        key: "state",
        render: (text, record, index) => (
          <span>
            <Badge
              status={record.status1 ? "success" : "error"}
              text={record.status1 ? "Finished" : "Baned"}
            />
          </span>
        ),
      },
      {
        title: "Upgrade Status",
        dataIndex: "upgradeNum",
        key: "upgradeNum",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: (text, record, index) => (
          <Space size="middle">
            <Button
              disabled={!record.status1}
              type="warning"
              onClick={() => {
                setisopen(true);
                setcont(record);
                // console.log(record);
              }}
            >
              edit
            </Button>
            <Button
              type="warning"
              onClick={() => {
                // console.log(record);
                const arr1 = [...listSon];
                arr1[index].status1 = !record.status1;
                setListSon(arr1);
                // console.log(arr1);
              }}
            >
              Stop
            </Button>
            <Dropdown
              disabled={!record.status1}
              menu={{
                items,
              }}
            >
              <Button type="warning">
                More <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        ),
      },
    ];

    return (
      <>
        <Table columns={columns} dataSource={data} pagination={false} />
        <EditSon
          cont={cont}
          isopen={isopen}
          close={() => {
            setisopen(false);
          }}
          getchild1={(info) => {
            const beforeEdit = [...listSon];
            const index = beforeEdit.findIndex((el) => el.key === info.key);
            beforeEdit[index] = info;
            setListSon(beforeEdit);
          }}
        ></EditSon>
      </>
    );
  };

  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Upgraded",
      dataIndex: "upgradeNum",
      key: "upgradeNum",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        return (
          <Switch
            checked={record.status}
            onClick={() => {
              const arr = [...datalist];
              arr[index].status = !record.status;
              setdatalist(arr);
            }}
          />
        );
      },
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "operation",
      render: (text, record, index) => (
        <Space size={6}>
          <Button
            disabled={!record.status}
            danger={true}
            onClick={() => {
              console.log(record, text, index);
              const beforeDel = [...datalist];
              const afterDel = beforeDel.filter((el) => el.key !== record.key);
              setdatalist(afterDel);
            }}
          >
            删除
          </Button>
          <Button
            disabled={!record.status}
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
              setvalue1(record);
            }}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];
  //   console.log(datalist);

  return (
    <>
      <Space size={8}>
        <Button
          type="primary"
          onClick={() => {
            length = length + 1;
            const arr = [...datalist];
            arr.unshift({
              key: length - 1,
              name: "kuke",
              platform: "Android",
              status: true,
              version: "10.3.4.5654",
              upgradeNum: 500,
              creator: "Jack",
              createdAt: "2014-12-24 23:12:00",
            });

            setdatalist(arr);
            console.log(datalist);
          }}
        >
          新增一项
        </Button>
        <Button
          danger={true}
          onClick={() => {
            // setchecked((v) => !v);

            if (selectedRowKeys.length <= 0) {
              alert("请选择要批量处理的数据");
            }
            const beforeDel = [...datalist];
            const afterDel = beforeDel.filter(
              (el) => !selectedRowKeys.includes(el.key)
            );
            setdatalist(afterDel);
            setSelectedRowKeys([]);
          }}
        >
          批量删除
        </Button>
      </Space>
      <Table
        columns={columns1}
        expandable={{
          // onExpand,
          onExpandedRowsChange,
          expandedRowRender,
          defaultExpandedRowKeys: [],
          rowExpandable: (record) => (record.status ? true : false),
        }}
        dataSource={datalist}
        rowSelection={rowSelection}
      />
      <EditNew
        isModalOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);
        }}
        value1={value1}
        getchild={(info) => {
          const beforeEdit = [...datalist];
          const index = beforeEdit.findIndex((el) => el.key === info.key);
          beforeEdit[index] = info;
          setdatalist(beforeEdit);
        }}
      ></EditNew>
    </>
  );
};
export default NewTable;
