import React, { useEffect, useRef, useState } from "react";
import { FormWrapper } from "../../Wrappers/Wrappers";
import Resumes from "../../Resumes/Resumes";
import Form from "../../Form/Form";
import { Modal } from "antd";
import { Button } from "../../Common/Button";
import axios from "../../../axios/axios";
import { notification } from "antd";
import { useFirebase } from "../../../context/Firebase";
import { orderQuestions } from "../../../utils";
import { useLanguage } from "../../../context/Language";
import { removeLocalUserProfiles } from "../../../utils"
import ProgressBar from "../../Common/ProgressBar/ProgressBar";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import DownloadModal from "../../Common/DownloadModal";

const App = () => {
  const [fetchProgress, setFetchProgress] = useState(null);
  const { user } = useFirebase();
  const [userQuestionsId, setUserQuestionsId] = useState(0);
  const [questions, setQuestions] = useState({});
  const [isResumeOptionModalVisible, setIsResumeOptionModalVisible] =
    useState(false); // Modal for selecting new or old resume
  const [selectedResumeOption, setSelectedResumeOption] = useState(""); // To store user's choice
  const { language: lang } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resumeRef = useRef();

  useEffect(() => {
    // Check if the modal has been shown before
    const modalShownBefore = localStorage.getItem("resumeOptionModalShown");

    if (modalShownBefore !== "true") {
      setIsResumeOptionModalVisible(true);

      localStorage.setItem("resumeOptionModalShown", "true");
    } else {
      // If shown before, fetch data and proceed without displaying the modal
      // ... (your existing fetch data logic)
    }
  }, [lang, user.uid]);

  function setUpdatedQuestions(questions, isNext = false) {
    setQuestions({ ...questions, isNext });
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("kneg/questions_per_user/" + user.uid, {
        params: {
          lang: lang,
          create: selectedResumeOption === "new" ? true: false
        },
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setFetchProgress(percentCompleted);
        },
      });
      if(selectedResumeOption === "new") {
        removeLocalUserProfiles()
      }
      const { data } = response;
      let langBasedQuestion = data.data.find(
        (question) => question.language === lang
      );
      if (!langBasedQuestion) {
        // Load application questions for the language

        notification.error({
          message: "Question not found",
          description:
            "No questions found for the language: " +
            lang +
            "\n Using default English",
        });
        return;
      }
      langBasedQuestion = data.data.find(
        (question) => question.language === lang
      );
      setUserQuestionsId(langBasedQuestion.id);
      let currentQuestions = JSON.parse(langBasedQuestion.question_JSON);
      let orderedQuestions = orderQuestions(currentQuestions);
      setQuestions({ ...orderedQuestions, isNext: false });

    } catch (error) {
      notification.error({
        title: "Fetch data error",
        description: "Fetch users data Error"
      })
    }
  };

  useEffect(() => {
    // Fetch data
    fetchData()
  }, [lang, selectedResumeOption, user.uid]);

  // Function to handle user's choice of creating a new resume or loading an old one
  const handleResumeOptionChoice = (choice) => {
    setSelectedResumeOption(choice);
    setIsResumeOptionModalVisible(false);
  };

  // Responsiveness
  const [phoneMode, setPhoneMode] = useState(window.innerWidth < 1200);
  const [showResume, setShowResume] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setPhoneMode(window.innerWidth < 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleMode() {
    setShowResume(!showResume);
  }

  if (isResumeOptionModalVisible) {
    // Display the resume option modal
    return (
      <div>
        <Modal
          title="Resume Options"
          visible={isResumeOptionModalVisible}
          footer={null}
          onCancel={() => setIsResumeOptionModalVisible(false)}
        >
          <p>Do you want to create a new resume or load an old one?</p>
          <Button onClick={() => handleResumeOptionChoice("new")}>
            Create New Resume
          </Button>
          <Button onClick={() => handleResumeOptionChoice("old")}>
            Load Old Resume
          </Button>
        </Modal>
      </div>
    );
  }

  if (Object.keys(questions).length === 0) {
    return <ProgressBar progress={fetchProgress} />;
  }

  ////////////////////////////////
  // Download PDF Instantly
  ////////////////////////////////
  const handleDownloadPdf = async (e) => {
    if(e) {
      e.preventDefault();
    }
    const element = resumeRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, 210, 248.4855);
    pdf.save("print.pdf");
  };

  return (
    <>
      <div className="flex-container">
        <FormWrapper phoneMode={phoneMode} showResume={showResume}>
          <Form
            questions={questions}
            setQuestions={setUpdatedQuestions}
            type={"resume"}
            userQuestionsId={userQuestionsId}
            setIsModalOpen={setIsModalOpen}
          />
        </FormWrapper>
        {(!phoneMode || showResume) && (
          <Resumes
            questions={questions}
            setQuestions={setUpdatedQuestions}
            userQuestionsId={userQuestionsId}
            resumeRef={resumeRef}
            handleDownloadPdf={handleDownloadPdf}
          />
        )}
      </div>
      <div className="toggler">
        {phoneMode && (
          <Button onClick={toggleMode}>
            {showResume ? "Switch to Form" : "Switch to Resume"}
          </Button>
        )}
      </div>
      <DownloadModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDownloadPdf={handleDownloadPdf}
      />
    </>
  );
};

export default App;
