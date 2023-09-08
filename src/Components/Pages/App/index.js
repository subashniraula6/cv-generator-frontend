import React, { useEffect, useState } from "react";
import { FormWrapper } from "../../Wrappers/Wrappers";
import Resumes from "../../Resumes/Resumes";
import Form from "../../Form/Form";
import { Button } from "../../Common/Button";
import axios from "../../../axios/axios";
import { Spin } from "antd";
import { useFirebase } from "../../../context/Firebase";

const App = () => {
  let { user } = useFirebase();
  let [questions, setQuestions] = useState(() => {
    // Load saved questions
    const saved = localStorage.getItem("questions");
    const initialValue = JSON.parse(saved);

    if (initialValue) return { ...initialValue, isNext: false };
    return {};
  });

  useEffect(() => {
    // Fetch data
    axios
      .get("questions_per_user/" + 123456789) //replace with user.uid
      .then(({ data }) => {
        let currentQuestions = JSON.parse(data.data[0].question_JSON); // 0 refers first resume
        setQuestions({ ...currentQuestions, isNext: true });
      });
  }, []);

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
