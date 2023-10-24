/**
 * 1.使用antd创建了一个带选择框的table
 * 2.使用table新增一行
 * 3.根据选择框批量删除
 * 4.根据每行对应的删除按钮删除元素
 * 5.根据每行对应的编辑按钮实现对表的信息更改
 */

/**
 ******1.新增功能，使用钩子勾取原table的数组，使用中间数组重新遍历，然后set将此数组作为新的data数组 
 ******2.批量删除：此antd组件有一个selectrowkeys，是一个选中行的key值数组，然后再设置中间数组，filter方法过滤掉选中的对象（数组元素）
 * 剩下数组是一个新数组，然后赋值给data改变状态值，最后再设置selectrowkeys.length为0 
 ******3.删除功能：在标题栏设置render，返回text，record，index三个参数，在删除按钮被点击触发时，利用一个新数组复制data，然后再用filter过滤掉此时ind和
 * index相同的对象
 ******4.编辑功能：使用了弹框Modal，内用了子父组件的相互传值，需要进一步了解useEffect的第二个参数，是指此数组内部修改后，会再次重新渲染整个列表
 解决了每次点开后都是第一次点击的默认值。然后通过传值控制Modal的打开与关闭，通过form的setFiledsvalues设置初始值，
            form
            .validateFields()
            .then((value) => {
              const a = Object.assign(values, value);
              console.log(a);
              getChildValues(a);
              // console.log(value);
              close(false);
              form.resetFields();
            })
            .catch((err) => {
              console.log(err);
            });设置表单验证决定modal是否关闭，然后是修改key值对应的输入框的值渲染到table对应行，因为.validateFields().then((value)中value没有key
* 值，所以用到了Object.assign(target,new)方法合并对象，再传值回去setData（），最后将修改内容成功渲染在table里
*/
import { Button, Table, Space } from "antd";
import React, { useState } from "react";
import Text from "./text";
var length = 46;
const datal = [];
for (let i = 0; i < length; i++) {
  datal.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const Review = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([...datal]);
  const [values, setValues] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
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
          <Space size={8}>
            <Button
              type="primary"
              onClick={() => {
                // console.log(index);
                let died = [...data];
                let diedfin = died.filter((el, ind) => index !== ind);
                setData(diedfin);
              }}
            >
              删除
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsModalOpen(true);
                // console.log(record);
                setValues(record);
              }}
            >
              编辑
            </Button>
          </Space>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  // console.log(data);
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
        <Space size={8}>
          <Button
            type="primary"
            onClick={() => {
              length = length + 1;
              const dataList = [...data];
              dataList.unshift({
                key: length - 1,
                name: `Edward King ${length - 1}`,
                age: 32,
                address: `London, Park Lane no. ${length - 1}`,
              });
              setData(dataList);
            }}
          >
            新增一项
          </Button>
          <Text
            isModalOpen={isModalOpen}
            getChildValues={(a) => {
              //(a, index)
              const arrlist = [...data];
              /*   arrlist[values.key].name = values.name;
              //   arrlist[values.key].age = values.age;
              //   arrlist[values.key].address = values.address;*/
              let index = arrlist.find((el) => el.key === a.key);
              console.log(index);
              arrlist[index] = a;
              // arrlist[index] = a;
              //   console.log(index);
              // debugger;
              setData(arrlist);
            }}
            close={() => {
              setIsModalOpen(false);
            }}
            values={values}
          ></Text>
          <Button
            type="primary"
            onClick={() => {
              if (selectedRowKeys.length === 0) {
                alert("请选择你要操作的数据");
              }
              //   console.log("删除成功");
              let list = [...data];
              let arr = list.filter((el) => !selectedRowKeys.includes(el.key));
              setData(arr);
              setSelectedRowKeys(0);
            }}
          >
            批量删除
          </Button>
        </Space>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
export default Review;
