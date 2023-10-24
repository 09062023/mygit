import { Checkbox, Divider } from "antd";
import React, { useState } from "react";
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Apple", "Pear", "Orange", "bananas"];
const defaultCheckedList = ["Apple", "Orange"];
const ApiStudy = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList); //使用useState()定义已选择列表
  const [indeterminate, setIndeterminate] = useState(true); //定义的是选中和未选中
  const [checkAll, setCheckAll] = useState(false); //定义全选
  const onChange = (list) => {
    //onchange回调
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </>
  );
};
export default ApiStudy;
