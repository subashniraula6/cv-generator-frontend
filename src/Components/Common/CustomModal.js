import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import { EditFilled } from '@ant-design/icons'

export default function CustomModal({ handleEditSection, handleCancelSection, children, title }) {
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
        fontSize: '18px'
    }
    return (
      <>
        <EditFilled style={iconStyle} onClick={showModal}>
          Open Modal
        </EditFilled>
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {children}
        </Modal>
      </>
    );
};
