import React, { useEffect, useState } from "react";
import { FormWrapper } from "../../Wrappers/Wrappers";
import Resumes from "../../Resumes/Resumes";
import Form from "../../Form/Form";
import Questions from "../../../Questions2";
import { Button } from "../../Common/Button";

const App = () => {
  let [questions, setQuestions] = useState(() => {
    // Load saved questions
    const saved = localStorage.getItem("questions");
    const initialValue = JSON.parse(saved);

    if (initialValue) return { ...initialValue, isNext: false };
    return Questions;
  });

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

  return (
    <>
      <div className="flex-container">
        <FormWrapper phoneMode={phoneMode} showResume={showResume}>
          <Form
            questions={questions}
            setQuestions={setUpdatedQuestions}
            type={"resume"}
          />
        </FormWrapper>
        {(!phoneMode || showResume) && (
          <Resumes questions={questions} setQuestions={setUpdatedQuestions} />
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
