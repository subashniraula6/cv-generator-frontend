import React, { useState } from "react";
import { FormWrapper } from "../../Wrappers/Wrappers";
import Resumes from "../../Resumes/Resumes";
import Form from "../../Form/Form";
import Questions from "../../../Questions";

const App = () => {
  let [questions, setQuestions] = useState(() => {
    // Load saved questions
    const saved = localStorage.getItem("questions");
    const initialValue = JSON.parse(saved);

    if (initialValue) return {...initialValue, isNext: false};
    return Questions;
  });
  
  function setUpdatedQuestions(questions, isNext = false) {
    setQuestions({ ...questions, isNext });
    // Store lo localstorage on each questions change
    localStorage.setItem("questions", JSON.stringify(questions));
  }

  return (
    <div className="flex-container">
      <FormWrapper>
        <Form questions={questions} setQuestions={setUpdatedQuestions} type={"resume"} />
      </FormWrapper>
      <Resumes questions={questions} setQuestions={setUpdatedQuestions} />
    </div>
  );
};

export default App;
