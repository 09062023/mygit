import React from "react";
import { Button, Image } from "antd";
import china from "./china.png";
const StaffSa = () => {
  return (
    <>
      <Image src={china} height={500} width={500} />
      <hr />
      <Button
        type="primary"
        onClick={() => {
          alert("sucessful");
        }}
      >
        点击我
      </Button>
    </>
  );
};

export default StaffSa;
