import { QuestionWrapper } from "../Wrappers/QuestionWrapper";
import { useState, useEffect } from "react";
import Button from "../Wrappers/Button";
import { toSentenceCase } from "../../utils";
import Field from "../Common/Field";

export default function Form({ questions, setQuestions }) {
  let [currentQuestionIdx, setcurrentQuestionIdx] = useState(1);
  let [currentSubQuestionIdx, setcurrentSubQuestionIdx] = useState("");
  let [currentAnswer, setCurrentAnswer] = useState("");
  let [currentSection, setCurrentSection] = useState("basicInfo");
  let [lastEvent, setLastEvent] = useState("");

  useEffect(() => {
    if(questions?.isNext) {
      handleNext();
    }
  }, [questions]);
  
  useEffect(() => {
    if (lastEvent == "next") {
      let firstQuestionIdx = findFirstQuestionIdx();
      if (questions[currentSection]["repeatable"] === true) {
        let firstSubQuestionIdx = findFirstSubQuestionIdx(firstQuestionIdx);
        setcurrentSubQuestionIdx(firstSubQuestionIdx);
      }
      setcurrentQuestionIdx(firstQuestionIdx || currentQuestionIdx);
    } else if (lastEvent == "prev") {
      let lastQuestionIdx = findLastQuestionIndex();
      setcurrentQuestionIdx(lastQuestionIdx || currentQuestionIdx);
    }
  }, [currentSection]);

  console.log("currentQuestionIdx", currentQuestionIdx);
  console.log("questions", questions)
  // console.log("currentSubQuestionIdx", currentSubQuestionIdx);
  // console.log("currentSection", currentSection)

  function calculateSkipQuestions() {
    if(currentQuestionIdx === 1010 && (currentAnswer=="no" || currentAnswer=="")){
      return 1;
    }
    return 0;
  }

  const findNextQuestion = () => {
    let orderedIndexes = questions[currentSection]["questions"].sort(
      (a, b) => a.index - b.index
    );
    let currentQueArrIdx = orderedIndexes.findIndex(
      (q) => q.index === currentQuestionIdx
    );
    let skipQuestions = calculateSkipQuestions();
    return orderedIndexes[currentQueArrIdx + 1 + skipQuestions];
  };

  const findPrevQuestion = () => {
    let orderedIndexes = questions[currentSection]["questions"].sort(
      (a, b) => a.index - b.index
    );
    let currentQueArrIdx = orderedIndexes.findIndex(
      (q) => q.index === currentQuestionIdx
    );
    return orderedIndexes[currentQueArrIdx - 1];
  };

  const updateQuestions = () => {
    if (currentQuestionIdx === 11 && currentAnswer === "yes") {
      let prevQuestion = findPrevQuestion();
      let answers = prevQuestion.answer.split(",");
      let questionTemplate = questions[currentSection][
        "auto_generated_questions"
      ].find((q) => q.index === currentQuestionIdx);
      if (questionTemplate) {
        let generated_questions = answers.map((a, idx) => {
          return {
            ...questionTemplate,
            index: currentQuestionIdx + (idx + 1),
            question: questionTemplate["question"].replace(/{{\w+}}/, a),
          };
        });
        setQuestions({
          ...questions,
          [currentSection]: { ...questions[currentSection], questions: [...questions[currentSection]['questions'], ...generated_questions].sort((a,b) => a.index-b.index) },
        }, true);
      }
    } else if (currentQuestionIdx === 11 && (currentAnswer === "no" || currentAnswer === "")) {
      setQuestions({
        ...questions,
        [currentSection]: { ...questions[currentSection], questions: questions[currentSection]['questions'].filter(q => q.index <= currentQuestionIdx || q.index >= 50 ).sort((a,b) => a.index-b.index) },
      }, true);
    } else {
      handleNext();
    }
  };

  const handleNext = () => {
    let lastQuestionIndex = findLastQuestionIndex();
    if (currentQuestionIdx < lastQuestionIndex) {
      let nextQuestionIdx = findNextQuestion().index;
      setcurrentQuestionIdx(nextQuestionIdx);
    } else {
      let nextSection = findNextSection();
      setCurrentSection(nextSection);
    }
    setLastEvent("next");
  };

  const handlePrev = (e) => {
    let firstQuestionIndex = findFirstQuestionIdx();
    if (currentQuestionIdx > firstQuestionIndex) {
      let prevQuestionIdx = findPrevQuestion().index;
      setcurrentQuestionIdx(prevQuestionIdx);
    } else {
      let prevSection = findPrevSection();
      setCurrentSection(prevSection);
    }
    setLastEvent("prev");
  };

  const findPrevSection = () => {
    let sections = Object.keys(questions);
    let currentSectionIndex = sections.findIndex(
      (section) => section === currentSection
    );
    let prevSection = sections[currentSectionIndex - 1];
    return prevSection;
  };

  const findNextSection = () => {
    let sections = Object.keys(questions);
    let currentSectionIndex = sections.findIndex(
      (section) => section === currentSection
    );
    let nextSection;
    if (
      currentQuestionIdx === 1012 &&
      (currentAnswer === "no" || currentAnswer === "")
    ) {
      nextSection = sections[currentSectionIndex + 2];
    } else {
      nextSection = sections[currentSectionIndex + 1];
    }
    return nextSection;
  };

  const findFirstQuestionIdx = () => {
    let firstQuestionIdx = Math.min(
      ...questions[currentSection]["questions"].map((q) => q.index)
    );
    return firstQuestionIdx;
  };

  const findFirstSubQuestionIdx = (firstQuestionIdx) => {
    let firstQuestion = questions[currentSection]["questions"].find(
      (q) => q.index === firstQuestionIdx
    );
    let firstSubQuesIdx = firstQuestion["questions"].sort(
      (a, b) =>
        parseInt(a.index.split("_")[1]) - parseInt(b.index.split("_")[1])
    )[0]["index"];
    return firstSubQuesIdx;
  };

  const findLastQuestionIndex = () => {
    return Math.max(
      ...questions[currentSection]["questions"].map((q) => q.index)
    );
  };

  const handleContinue = (e) => {
    e.preventDefault();
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    let currentQuesArrIndex = questions[currentSection]["questions"].findIndex(
      (q) => q.index === currentQuestionIdx
    );

    updatedQuestions[currentSection]["questions"][currentQuesArrIndex][
      "answer"
    ] = currentAnswer;
    console.log("updatedQuestions", updatedQuestions);
    // Update DB
    // Fetch DB and set questions state
    setQuestions(updatedQuestions);
    updateQuestions();
  };

  const handleInputChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleSelectChange = (options) => {
    setCurrentAnswer(options.join(",").trim());
  };

  const handleSlideChange = ({ target }) => {
    setCurrentAnswer(target.ariaChecked === "true" ? "yes" : "no");
  };

  const addDropdownOption = (option) => {
    // add question options
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    let currentQuesArrIndex = questions[currentSection]["questions"].findIndex(
      (q) => q.index === currentQuestionIdx
    );
    updatedQuestions[currentSection]["questions"][currentQuesArrIndex][
      "options"
    ] += ", " + option;
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <h1>Form</h1>
      <form>
        <h3>{toSentenceCase(currentSection)}</h3>
        {/* Basic Info */}
        {Object.keys(questions)?.map((section) => {
          return questions[section].questions?.map((question) => {
            return (
              <QuestionWrapper
                currentQuestionIdx={currentQuestionIdx}
                questionIdx={question.index}
                key={question.index + JSON.stringify(question.answer)}
              >
                {questions[section]["repeatable"] === false && (
                  <>
                    <Field
                      question={question}
                      handleInputChange={handleInputChange}
                      handleSelectChange={handleSelectChange}
                      handleSlideChange={handleSlideChange}
                      addDropdownOption={addDropdownOption}
                    />
                    <div>
                      <Button
                        style={{ borderRadius: "2px 0 0 2px" }}
                        onClick={(e) => handleContinue(e)}
                      >
                        Continue
                      </Button>
                    </div>
                  </>
                )}
                {/* {questions[section]["repeatable"] === true && (
                  <>
                    {question.questions.map((subQues) => {
                      console.log("SubQues", subQues)
                      console.log("currentQuestionIdx", currentQuestionIdx)
                      console.log("currentSubQuestionIdx", currentSubQuestionIdx)
                      console.log("SubQues Index", subQues.index)
                      return (
                        <>
                          <QuestionWrapper
                            currentQuestionIdx={currentSubQuestionIdx}
                            questionIdx={subQues.index}
                            key={subQues.index + JSON.stringify(subQues.answer)}
                          >
                            <Field
                              question={subQues}
                              handleInputChange={handleInputChange}
                              handleSelectChange={handleSelectChange}
                              handleSlideChange={handleSlideChange}
                              addDropdownOption={addDropdownOption}
                            />
                            <div>
                              <Button
                                style={{ borderRadius: "2px 0 0 2px" }}
                                onClick={(e) => handleSubQuesContinue(e)}
                              >
                                Continue
                              </Button>
                            </div>
                          </QuestionWrapper>
                        </>
                      );
                    })}
                  </>
                )} */}
              </QuestionWrapper>
            );
          });
        })}
      </form>
      <div>
        <Button
          style={{ borderRadius: "2px 0 0 2px" }}
          onClick={handlePrev}
          disabled={currentQuestionIdx <= 1}
        >
          Previous
        </Button>
        <Button
          style={{ borderRadius: "2px 0 0 2px" }}
          type="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  );
}
