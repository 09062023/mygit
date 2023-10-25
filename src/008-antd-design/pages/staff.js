import React, { useState } from "react";
import { Button, Space, Switch, Table } from "antd";
import Edited from "../components/edit";
var len = 20;
const data = [];
for (let i = 0; i < len; i++) {
  data.push({
    key: i,
    name: `poem ${i}`,
    age: 52,
    status: true,
    address: `dynasty Tang ${i}`,
  });
}

const Staff = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [datalist, setdatalist] = useState(data);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [value, setvalue] = useState();

  const onSelectChange = (newSelectedRowKeys, rows) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys, rows);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(rows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
      title: "Status",
      dataIndex: "status",
      render(text, row, index) {
        return (
          <Switch
            checked={row.status}
            onClick={() => {
              const changestatus = [...datalist];
              const ind = changestatus.findIndex((el) => el.key === row.key);
              changestatus[ind] = Object.assign(
                row,
                (row.status = row.status ? false : true)
              );
              setdatalist(changestatus);
            }}
          />
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render(text, row, index) {
        return (
          <Space size={10}>
            <Button
              danger={true}
              disabled={!row.status}
              onClick={() => {
                const delone = [...datalist];
                const arr = delone.filter((el) => el.key !== row.key);
                setdatalist(arr);
              }}
            >
              删除
            </Button>
            <Button
              type="primary"
              disabled={!row.status}
              onClick={() => {
                setisModalOpen(true);
                setvalue(row);
              }}
            >
              编辑
            </Button>
          </Space>
        );
      },
    },
  ];
  const tishi = () => {
    if (selectedRowKeys.length === 0) {
      alert("请选择要处理的数据");
    }
  };
  const add = () => {
    len++;
    const listadd = [...datalist];
    listadd.unshift({
      key: len - 1,
      name: `poem ${len - 1}`,
      age: 52,
      status: false,
      address: `dynasty Tang ${len - 1}`,
    });
    setdatalist(listadd);
  };
  const delsome = () => {
    tishi();
    const listdel = [...datalist];
    const afterlist = listdel.filter((el) => !selectedRows.includes(el));
    setdatalist(afterlist);
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };
  const changesomestatus = (boolean) => {
    const a = selectedRows.map((el) =>
      Object.assign(el, (el.status = boolean))
    );
    const b = [...datalist];
    const c = b.filter((el) => !selectedRows.includes(el));
    const d = [...a, ...c];
    d.sort((p, q) => p.key - q.key);
    setdatalist(d);
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };
  const closestatus = () => {
    tishi();
    // console.log(selectedRows);
    changesomestatus(false);
  };
  const openstatus = () => {
    tishi();
    // console.log(selectedRows);
    changesomestatus(true);
  };
  return (
    <>
      <Space size={12}>
        <Button type="primary" onClick={add}>
          新增
        </Button>
        <Button danger={true} onClick={delsome}>
          批量删除
        </Button>
        <Button danger={true} onClick={closestatus}>
          批量禁用
        </Button>
        <Button type="primary" onClick={openstatus}>
          批量启用
        </Button>
      </Space>
      <Table
        rowSelection={rowSelection}
        dataSource={datalist}
        columns={columns}
      />
      <Edited
        isModalOpen={isModalOpen}
        close={(boolean) => {
          setisModalOpen(boolean);
        }}
        value={value}
        getchild={(a) => {
          const arrlist = [...datalist];
          const ind = arrlist.findIndex((el) => el.key === a.key);
          arrlist[ind] = a;
          setdatalist(arrlist);
        }}
      />
    </>
  );
};

export default Staff;
