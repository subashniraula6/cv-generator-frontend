import { QuestionWrapper } from "../Wrappers/QuestionWrapper";
import { useState, useEffect } from "react";
import Button from "../Wrappers/Button";
import { toSentenceCase } from "../../utils";
import Field from "../Common/Field";

export default function Form({ questions, setQuestions }) {
  let [currentQuestionIdx, setcurrentQuestionIdx] = useState(1);
  let [currentAnswer, setCurrentAnswer] = useState("");
  let [currentSection, setCurrentSection] = useState("basicInfo");
  let [lastEvent, setLastEvent] = useState("");
  let [isRepeatQuestion, setIsRepeatQuestion] = useState(false);
  let [isUpdateQuestion, setIsUpdateQuestion] = useState(false);

  useEffect(() => {
    if (questions?.isNext) {
      handleNext();
    }
  }, [questions]);
  
  useEffect(() => {
    let currentQuestion = findCurrentQuestion();
    let currentAns = currentQuestion?.answer;
    setCurrentAnswer(currentAns);

    let isRepeat = currentQuestion?.repeatable;
    setIsRepeatQuestion(isRepeat || false);

    let isUpdate = currentQuestion?.update ? true : false;
    setIsUpdateQuestion(isUpdate);
  }, [currentQuestionIdx]);
  
  useEffect(() => {
    if (lastEvent == "next") {
      let firstQuestionIdx = findFirstQuestionIdx();
      setcurrentQuestionIdx(firstQuestionIdx || currentQuestionIdx);
    } else if (lastEvent == "prev") {
      let lastQuestionIdx = findLastQuestionIndex();
      setcurrentQuestionIdx(lastQuestionIdx || currentQuestionIdx);
    }
  }, [currentSection]);

  function calculateSkipQuestions() {
    if (
      currentQuestionIdx === 1010 &&
      (currentAnswer == "no" || currentAnswer == "")
    ) {
      return 1;
    }
    return 0;
  }
  
  const findCurrentQuestion = () => {
    return questions[currentSection]["questions"].find(
      (q) => q.index === currentQuestionIdx
    );
  };

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
  
  const updateQuestions = (updatedQuestions) => {
    if (currentQuestionIdx === 15 && currentAnswer === "yes") {
      let prevQuestion = findPrevQuestion();
      let answers = prevQuestion.answer.split(",");
      if (!answers.length || !answers[0]) {
        handleNext();
        return;
      }
      // remove previously generated questions
      updatedQuestions[currentSection]['questions'] = 
      updatedQuestions[currentSection]['questions'].filter((q) => q.index <= currentQuestionIdx || q.index >= 50)
      .sort((a, b) => a.index - b.index);

      // add new generated questions
      let questionTemplate = updatedQuestions[currentSection][
        "auto_generated_questions"
      ].find((q) => q.index === 1);
      if (questionTemplate) {
        let generated_questions = answers.map((a, idx) => {
          return {
            ...questionTemplate,
            index: currentQuestionIdx + (idx + 1),
            question: questionTemplate["question"].replace(/{{\w+}}/, a),
          };
        });
        setQuestions(
          {
            ...updatedQuestions,
            [currentSection]: {
              ...updatedQuestions[currentSection],
              questions: [
                ...updatedQuestions[currentSection]["questions"],
                ...generated_questions,
              ].sort((a, b) => a.index - b.index),
            },
          },
          true
        );
      }
    } else if (
      currentQuestionIdx === 15 &&
      (currentAnswer === "no" || currentAnswer === "")
    ) {
      // delete previously generated questions
      setQuestions(
        {
          ...updatedQuestions,
          [currentSection]: {
            ...updatedQuestions[currentSection],
            questions: updatedQuestions[currentSection]["questions"]
              .filter((q) => q.index <= currentQuestionIdx || q.index >= 50)
              .sort((a, b) => a.index - b.index),
          },
        },
        true
      );
    } else if (isRepeatQuestion && currentAnswer === "yes") {
      let additionalQuestions = updatedQuestions[currentSection][
        "auto_generated_questions"
      ].map((q, idx) => ({
        ...q,
        index: currentQuestionIdx + (idx + 1),
        no: questions[currentSection]["noOfItems"] + 1,
      }));
      setQuestions(
        {
          ...updatedQuestions,
          [currentSection]: {
            ...updatedQuestions[currentSection],
            noOfItems: updatedQuestions[currentSection]["noOfItems"] + 1,
            questions: [
              ...updatedQuestions[currentSection]["questions"],
              ...additionalQuestions,
            ].sort((a, b) => a.index - b.index),
          },
        },
        true
      );
    } else if (isUpdateQuestion) {
      let currentQuestion = findCurrentQuestion();
      let startIdx = currentQuestionIdx + 1;
      let stopIdx = currentQuestionIdx + currentQuestion?.update?.noOfQues;
      let targetQuestions = updatedQuestions[currentSection]["questions"].filter(
        (q) => q.index >= startIdx && q.index <= stopIdx
      );
      let key = currentQuestion?.update?.key;
      let updatedTargetQuestions = targetQuestions.map((targetQuestion) => {
        let regExp = new RegExp("{{" + key + "}}");
        return {
          ...targetQuestion,
          question:
            targetQuestion.template?.replace(regExp, currentAnswer) ||
            targetQuestion.question,
        };
      });
      
      let replacedQuestions = replaceQuestions(updatedQuestions, updatedTargetQuestions);
      setQuestions(replacedQuestions, true);
    } else {
      handleNext();
    }
  };

  function replaceQuestions(updatedQuestions, targetQuestions) {
    let innerQuestions = updatedQuestions[currentSection]["questions"];
    targetQuestions.forEach((targetQuestion) => {
      let arrIdx = innerQuestions.findIndex(
        (question) => question.index === targetQuestion.index
      );
      innerQuestions[arrIdx] = targetQuestion;
    });
    return updatedQuestions;
  }

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
      let prevQuestionIdx = findPrevQuestion()?.index;
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
    // Update DB
    // Fetch DB and set questions state
    setQuestions(updatedQuestions);
    updateQuestions(updatedQuestions);
    // setTimeout(()=>{
    // }, [3000]);
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

  const handleDateChange = (date, dateStr) => {
    setCurrentAnswer(dateStr);
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
                <>
                  <Field
                    question={question}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleSlideChange={handleSlideChange}
                    handleDateChange={(date, dateStr) =>
                      handleDateChange(date, dateStr)
                    }
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
