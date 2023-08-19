import React from "react";
import { message, Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const PopConfirm = ({ confirm }) => {
  const iconStyle = {
    fontSize: "20px",
    color: "#BC243C"
  };
  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this section ?"
      onConfirm={(e) => confirm(e)}
      okText="Yes"
      cancelText="No"
    >
      <DeleteFilled style={iconStyle}>Delete</DeleteFilled>
    </Popconfirm>
  );
};
export default PopConfirm;
