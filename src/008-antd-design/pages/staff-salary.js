import React from "react";
import { Button, Image, Space } from "antd";
import china from "./china.png";
import xian from "./xian.png";
import country from "./country.png";
const StaffSa = () => {
  return (
    <>
      <Space size={10}>
        <Image src={china} height={500} width={510} />
        <Image src={xian} height={500} width={510} />
        <Image src={country} height={500} width={510} />
      </Space>
      <hr />
      <Space size={8}>
        <Button
          type="primary"
          onClick={() => {
            alert("sucessful");
          }}
        >
          点击我
        </Button>
        <Button
          onClick={() => {
            console.log("haha");
          }}
        >
          haha
        </Button>
      </Space>
    </>
  );
};

export default StaffSa;
