import Questions from "../../Questions";
import { QuestionWrapper } from "../Wrappers/QuestionWrapper";
import { useState, useEffect, useRef } from "react";
import { Input, Select, Space, Divider } from 'antd';
import Button from '../Wrappers/Button';
import { PlusOutlined } from '@ant-design/icons'
import MultiSelect from "../Common/MultiSelect";

export default function Form() {
  const toSentenceCase = camelCase => {
    if (camelCase) {
        const result = camelCase.replace(/([A-Z])/g, ' $1');
        return result[0].toUpperCase() + result.substring(1).toLowerCase();
    }
    return '';
  };

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

  const handleSelectChange = (options) => {
    setCurrentAnswer(options.join(',').trim());
  }

  return (
    <>
      <h1>Form</h1>
      <form>
        <h4>{toSentenceCase(currentSection)}</h4>
        {/* Basic Info */}
        {questions?.basicInfo?.questions?.map((question) => (
          <QuestionWrapper
            currentQuestionIdx={currentQuestionIdx}
            questionIdx={question.index}
            key={question.index}
          >
            <label> {question.question} </label>
            {
              question.type === 'text' &&
              <Input
                type="text"
                name={question.index}
                onChange={handleInputChange}
                defaultValue={question.answer}
              />
            }

            {
              question.type === 'boolean' &&
              <Input
                type="radio"
                // name={question.index}
                // onChange={handleInputChange}
                // defaultValue={question.answer}
              />
            }

            {
              question.type === 'select' &&
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                // value={selectedItems}
                onChange={handleSelectChange}
                style={{
                  width: '100%',
                }}
                options={question.options.split(',').map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            }

            {
              question.type === 'textSelect' &&
                <MultiSelect 
                  questions={questions}
                  currentSection={currentSection}
                  currentQuestionIdx={currentQuestionIdx}
                  setQuestions={setQuestions}
                  handleSelectChange={handleSelectChange}
                  question={question}
                />
            } 

            <Button
              onClick={(e) => handleContinue(e, "basicInfo", question.index)}
              disabled={!currentAnswer}
            >
              Continue
            </Button>
          </QuestionWrapper>
        ))}

        {/* Work Experience */}
        {questions?.workExp?.questions?.map((question) => (
          <QuestionWrapper
            currentQuestionIdx={currentQuestionIdx}
            questionIdx={question.index}
            key={question.index}
          >
            <label> {question.question} </label>
            <Input
              type="text"
              name={question.index}
              onChange={handleInputChange}
              defaultValue={question.answer}
            />
            <Button
              onClick={(e) => handleContinue(e, "workExp", question.index)}
            >
              Continue
            </Button>
          </QuestionWrapper>
        ))}
      </form>
      <Button onClick={handlePrev}>Previous</Button>
      <Button onClick={handleNext}>Next</Button>
    </>
  );
}
