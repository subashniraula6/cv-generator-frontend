import React, { useState } from "react";
import { Modal } from "antd";
import { Button } from "../Common/Button";
import { DownloadOutlined } from "@ant-design/icons";
import { useLanguage } from "../../context/Language";

const DownloadModal = ({ isModalOpen, setIsModalOpen, handleDownloadPdf }) => {
  const { language: lang, t } = useLanguage();
  const hideModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title=""
      open={isModalOpen}
      footer={null}
      centered={true}
      onCancel={hideModal}
    >
      <div style={{ textAlign: "center" }}>
        <h2>{t("label.downloadcv")}</h2>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={(e) => {
            handleDownloadPdf(e);
            setIsModalOpen(false);
          }}
        >
          {t("button.download")}
        </Button>
      </div>
    </Modal>
  );
};
export default DownloadModal;
