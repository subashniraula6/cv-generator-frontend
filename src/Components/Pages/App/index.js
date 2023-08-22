import React, { useState } from "react";
import { FormWrapper } from "../../Wrappers/Wrappers";
import Resumes from "../../Resumes/Resumes";
import Form from "../../Form/Form";
import Questions from "../../../Questions";

const App = () => {
  let [questions, setQuestions] = useState(Questions);
  function setUpdatedQuestions(questions, isNext = false) {
    setQuestions({ ...questions, isNext });
  }
  return (
    <div className="flex-container">
      <FormWrapper>
        <Form questions={questions} setQuestions={setUpdatedQuestions} />
      </FormWrapper>
      <Resumes questions={questions} setQuestions={setUpdatedQuestions} />
    </div>
  );
};

export default App;
