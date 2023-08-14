import { Button, Modal } from "antd";
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
    fontSize: "16px",
    color: "#056afb",
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
              style={{
                borderRadius: "2px 0 0 2px",
                marginRight: "5px",
                bottom: 0,
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              style={{ borderRadius: "2px 0 0 2px" }}
              onClick={handleOk}
              type="primary"
            >
              Save
            </Button>
          </div>
        }
      >
        {children}
        <div></div>
      </Modal>
    </>
  );
}
