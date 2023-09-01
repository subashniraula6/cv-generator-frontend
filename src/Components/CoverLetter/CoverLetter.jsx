import { Button, Modal, Spin } from "antd";
import React, { useRef, useState } from "react";
import {
  DownloadOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../context/Language";
import ReactToPrint from "react-to-print";
import Form from "./Form";

export default function CoverLetter({ title, questions, setQuestions }) {
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCoverGenerated, setIsCoverGenerated] = useState(false);

  const coverRef = useRef();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { t, language: lang } = useLanguage();

  const iconStyle = {
    fontSize: "20px",
    color: "#5B5EA6",
  };

  function generateCover(e) {
    let payload = {
      questions: [
        ...questions["targetCompany"]["questions"].map((q) => ({
          question: q.question,
          answer: q.answer[lang],
        })),
        ...questions["basicInfo"]["questions"],
      ],
    };
    let dataInput =
      "Generate a html cover letter from following json. Do not include title just the ready to send document and include todays date as well: ";
    dataInput += JSON.stringify(payload);

    const requestData = {
      prompt: "cover letter maker" + "\n" + dataInput,
      engine: "text-davinci-003",
      password: "aeZak1939pska",
    };
    setIsLoading(true);
    fetch("https://eric-sales-bot.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((resp) => {
        setIsLoading(false);
        let { response } = resp;
        if (Array.isArray(response) && response[1] === 500) {
        } else {
          setContent(response);
          setIsCoverGenerated(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Open AI error");
      });
  }

  const coverLetterStyle = {
    padding: "30px",
  };

  return (
    <>
      <Button
        type="primary"
        style={{ borderRadius: "2px 0 0 2px" }}
        onClick={showModal}
      >
        <FileDoneOutlined />
        {t("button.coverLetter")}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        footer={
          <div>
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
            <ReactToPrint
              trigger={() => {
                return (
                  <Button
                    style={{ borderRadius: "2px 0 0 2px" }}
                    onClick={handleOk}
                    type="primary"
                    icon={<DownloadOutlined />}
                    disabled={!isCoverGenerated}
                  >
                    Download
                  </Button>
                );
              }}
              content={() => coverRef.current}
            />
          </div>
        }
      >
        <Form
          questions={questions}
          setQuestions={setQuestions}
          generateCover={generateCover}
        />
        <Spin spinning={isLoading}>
          {isCoverGenerated && <h4>Preview</h4>}
          <div
            style={coverLetterStyle}
            ref={coverRef}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Spin>
      </Modal>
    </>
  );
}
