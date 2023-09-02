import { Modal } from "antd";
import {Button} from "../Common/Button"
import React, { useState } from "react";
import { EditFilled } from "@ant-design/icons";

export default function CustomModal({
  handleEditSection,
  handleCancelSection,
  children,
  title,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleEditSection();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    handleCancelSection();
    setIsModalOpen(false);
  };
  const iconStyle = {
    fontSize: "20px",
    color: "#5B5EA6",
  };
  return (
    <>
      <EditFilled style={iconStyle} onClick={showModal}>
        Open Modal
      </EditFilled>
      <Modal
        title={title}
        open={isModalOpen}
        footer={
          <div style={{ marginTop: "20px" }}>
            <Button
              btn={"action"}
              type={"primary"}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleOk}
              type="primary"
            >
              Save
            </Button>
          </div>
        }
      >
        {children}
      </Modal>
    </>
  );
}
