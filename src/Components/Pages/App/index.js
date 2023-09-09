import React, { useEffect, useState } from "react";
import { FormWrapper } from "../../Wrappers/Wrappers";
import Resumes from "../../Resumes/Resumes";
import Form from "../../Form/Form";
import { Button } from "../../Common/Button";
import axios from "../../../axios/axios";
import { Spin, notification } from "antd";
import { useFirebase } from "../../../context/Firebase";
import { orderQuestions } from "../../../utils"
import { useLanguage } from "../../../context/Language";

const App = () => {
  let { user } = useFirebase();
  let [userQuestionsId, setUserQuestionsId] = useState(0);
  let [questions, setQuestions] = useState(() => {
    // Load saved questions
    const saved = localStorage.getItem("questions");
    const initialValue = JSON.parse(saved);

    if (initialValue) return { ...initialValue, isNext: false };
    return {};
  });

  const { language: lang } = useLanguage();

  useEffect(() => {
    // Fetch data
    axios
      .get("kneg/questions_per_user/" + user.uid) //replace with user.uid
      .then(({ data }) => {
        let langBasedQuestion = data.data.find(question => question.language === lang);
        if(!langBasedQuestion) {
          notification.error({
            message: "Question not found",
            description: "No questions found for the language: " + lang + "\n Using default English",
          });
          return;
        }
        langBasedQuestion = data.data.find(question => question.language === "en");
        setUserQuestionsId(langBasedQuestion.id); 
        let currentQuestions = JSON.parse(langBasedQuestion.question_JSON); // 0 refers first resume
        let orderedQuestions = orderQuestions(currentQuestions)
        setQuestions({ ...orderedQuestions, isNext: false });
      });
  }, [lang]);
  
  function setUpdatedQuestions(questions, isNext = false) {
    setQuestions({ ...questions, isNext });
    // Store lo localstorage on each questions change
    localStorage.setItem("questions", JSON.stringify(questions));
  }

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

  if (Object.keys(questions).length === 0) return <Spin spinning={true} />;
  return (
    <>
      <div className="flex-container">
        <FormWrapper phoneMode={phoneMode} showResume={showResume}>
          <Form
            questions={questions}
            setQuestions={setUpdatedQuestions}
            type={"resume"}
            userQuestionsId={userQuestionsId}
          />
        </FormWrapper>
        {(!phoneMode || showResume) && (
          <Resumes questions={questions} setQuestions={setUpdatedQuestions} userQuestionsId={userQuestionsId}/>
        )}
      </div>
      <div className="toggler">
        {phoneMode && (
          <Button onClick={toggleMode}>
            {showResume ? "Switch to Form" : "Switch to Resume"}
          </Button>
        )}
      </div>
    </>
  );
};

export default App;
