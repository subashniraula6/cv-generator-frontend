import Questions from "../../Questions";
import { QuestionWrapper } from "../Wrappers/QuestionWrapper";
import { useState, useEffect } from "react";

export default function Form() {
  let [currentQuestionIdx, setcurrentQuestionIdx] = useState(1);
  let [questions, setQuestions] = useState(Questions);
  let [currentAnswer, setCurrentAnswer] = useState("");
  let [currentSection, setCurrentSection] = useState("basicInfo");

  useEffect(() => {
    // Change current questionIndex to the first question of current section
    // as soon as current section changes
    let firstQuestionIdx = findFirstQuestionIdx();
    setcurrentQuestionIdx(firstQuestionIdx);
  }, [currentSection]);

  const handleNext = () => {
    let lastQuestionIndex = findLastQuestionIndex();
    if (currentQuestionIdx < lastQuestionIndex) {
      setcurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      let nextSection = findNextSection();
      console.log("nextSection ", nextSection);
      setCurrentSection(nextSection);
    }
  };

  const findNextSection = () => {
    let sections = Object.keys(questions);
    console.log("sections ", sections);
    let currentSectionIndex = sections.findIndex(
      (section) => section === currentSection
    );
    let nextSection = sections[currentSectionIndex + 1];
    return nextSection;
  };

  const findFirstQuestionIdx = () => {
    return Math.min(
      ...questions[currentSection]["questions"].map((q) => q.index)
    );
  };

  const findLastQuestionIndex = () => {
    return Math.max(
      ...questions[currentSection]["questions"].map((q) => q.index)
    );
  };

  const handlePrev = (e) => {
    setcurrentQuestionIdx(currentQuestionIdx - 1);
  };

  const handleContinue = (e, sectionName, questionIndex) => {
    e.preventDefault();
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    let currentQuesArrIndex = questions[sectionName]["questions"].findIndex(
      (q) => q.index === questionIndex
    );
    updatedQuestions[sectionName]["questions"][currentQuesArrIndex][
      "answer"
    ] = currentAnswer;
    console.log("updatedQuestions", updatedQuestions);
    // Update DB
    // Fetch DB and set questions state
    setQuestions(updatedQuestions);
    handleNext();
  };

  const handleInputChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  return (
    <>
      <h1>Form</h1>
      <form>
        {/* Basic Info */}
        <h4>{questions.basicInfo.title}</h4>
        {questions?.basicInfo?.questions?.map((question) => (
          <QuestionWrapper
            currentQuestionIdx={currentQuestionIdx}
            questionIdx={question.index}
            key={question.index}
          >
            <label> {question.question} </label>
            <input
              type="text"
              name={question.index}
              onChange={handleInputChange}
              defaultValue={question.answer}
            />
            <button
              onClick={(e) => handleContinue(e, "basicInfo", question.index)}
            >
              Continue
            </button>
          </QuestionWrapper>
        ))}

        {/* Work Experience */}
        <h4>{questions.workExp.title}</h4>
        {questions?.workExp?.questions?.map((question) => (
          <QuestionWrapper
            currentQuestionIdx={currentQuestionIdx}
            questionIdx={question.index}
            key={question.index}
          >
            <label> {question.question} </label>
            <input
              type="text"
              name={question.index}
              onChange={handleInputChange}
              defaultValue={question.answer}
            />
            <button
              onClick={(e) => handleContinue(e, "workExp", question.index)}
            >
              Continue
            </button>
          </QuestionWrapper>
        ))}
      </form>
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </>
  );
}
