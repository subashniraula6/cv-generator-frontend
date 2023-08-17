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

  // console.log("currentQuestionIdx", currentQuestionIdx);
  // console.log("currentAnswer", currentAnswer);
  // console.log("questions", questions);
  // console.log("currentSection", currentSection)

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
    )
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
console.log("questions", questions)
  const updateQuestions = () => {
    if (currentQuestionIdx === 11 && currentAnswer === "yes") {
      let prevQuestion = findPrevQuestion();
      let answers = prevQuestion.answer.split(",");
      if(!answers.length || !answers[0]) {
        handleNext();
        return;
      }
      let questionTemplate = questions[currentSection][
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
            ...questions,
            [currentSection]: {
              ...questions[currentSection],
              questions: [
                ...questions[currentSection]["questions"],
                ...generated_questions,
              ].sort((a, b) => a.index - b.index),
            },
          },
          true
        );
      }
    } else if (
      currentQuestionIdx === 11 &&
      (currentAnswer === "no" || currentAnswer === "")
    ) {
      setQuestions(
        {
          ...questions,
          [currentSection]: {
            ...questions[currentSection],
            questions: questions[currentSection]["questions"]
              .filter((q) => q.index <= currentQuestionIdx || q.index >= 50)
              .sort((a, b) => a.index - b.index),
          },
        },
        true
      );
    } else if (isRepeatQuestion && currentAnswer === "yes") {
        let additionalQuestions = questions[currentSection][
          "auto_generated_questions"
        ].map((q, idx) => ({...q, index: currentQuestionIdx + (idx + 1)}));
        setQuestions(
          {
            ...questions,
            [currentSection]: {
              ...questions[currentSection],
              questions: [
                ...questions[currentSection]["questions"],
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
      let targetQuestions = questions[currentSection]["questions"]
      .filter((q => q.index >= startIdx && q.index <= stopIdx));
      let key = currentQuestion?.update?.key;
      let updatedTargetQuestions = targetQuestions.map(targetQuestion => {
        if(!targetQuestion.question) {
          let regExp = new RegExp("{{" + key + "}}");
          return {...targetQuestion, question: targetQuestion.template?.replace(regExp, currentAnswer) || targetQuestion.question}
        }
        let { question, template } = targetQuestion;
        let ginger = "{{" + key + "}}";
        if(template && template.includes(ginger)) {
          // find left 3 characters and right 3 characters
          let left3 = template.indexOf(ginger);
        }
        return targetQuestion;
      });
      console.log("updateQuestions", updatedTargetQuestions)
      let updatedQuestions = replaceQuestions(updatedTargetQuestions);
      setQuestions(updatedQuestions, true);
    } else {
      handleNext();
    }
  };

  function replaceQuestions(targetQuestions) {
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    let innerQuestions = updatedQuestions[currentSection]['questions'];
    targetQuestions.forEach(targetQuestion => {
      let arrIdx = innerQuestions.findIndex(question => question.index === targetQuestion.index );
      innerQuestions[arrIdx] = targetQuestion
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
    console.log("currentAnswer", currentAnswer)
    console.log("updateQuestions", updatedQuestions)
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

  const handleDateChange = (date, dateStr) => {
    console.log(date, dateStr)
    setCurrentAnswer(dateStr);
  }

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
                    handleDateChange={(date, dateStr)=>handleDateChange(date, dateStr)}
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
