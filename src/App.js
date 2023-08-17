import "./App.css";
import Form from "./Components/Form/Form";
import "antd/dist/reset.css";
import { useState } from "react";
import Questions from "./Questions";
import { FormWrapper } from "./Components/Wrappers/Wrappers";
import Resumes from "./Components/Resumes/Resumes";
import NavBar from './Components/Common/NavBar'

function App() {
  let [questions, setQuestions] = useState(Questions);
  function setUpdatedQuestions(questions, isNext = false) {
    setQuestions({...questions, isNext});
  }
  return (
    <>
      <NavBar />
      <div className="flex-container">
        <FormWrapper>
          <Form questions={questions} setQuestions={setUpdatedQuestions} />
        </FormWrapper>
        <Resumes questions={questions} setQuestions={setUpdatedQuestions} />
      </div>
    </>
  );
}

export default App;
