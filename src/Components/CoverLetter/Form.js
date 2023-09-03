import { QuestionWrapper } from "../Wrappers/QuestionWrapper";
import { useState, useEffect } from "react";
import { Button } from "../Common/Button";
import { toSentenceCase } from "../../utils";
import Field from "../Common/Field";
import { useLanguage } from "../../context/Language";
import {
  FilePdfOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

export default function Form({ questions, setQuestions, generateCover }) {
  let [currentAnswer, setCurrentAnswer] = useState("");
  let [currentSection, setCurrentSection] = useState("targetCompany");
  let [isUpdateQuestion, setIsUpdateQuestion] = useState(false);
  let [isFormComplete, setIsFormComplete] = useState(false);

  let [currentQuestionIdx, setcurrentQuestionIdx] = useState(() => {
    // Load saved current question index
    const saved = localStorage.getItem("currentCoverQuestionIdx");
    const initialValue = parseInt(saved);
    if (initialValue) return initialValue;
    // Find first question idx from 'targetCompany'
    let firstQuestionIdx = questions[currentSection]["questions"]
      .map((q) => q.index)
      .sort((a, b) => a - b)[0];
    return firstQuestionIdx;
  });

  let { language: lang, t } = useLanguage();

  useEffect(() => {
    let currentQuestion = findCurrentQuestion();
    let currentAns = currentQuestion?.answer;
    setCurrentAnswer(currentAns);

    let isUpdate = currentQuestion?.update ? true : false;
    setIsUpdateQuestion(isUpdate);

    // store to localstorage
    localStorage.setItem("currentCoverQuestionIdx", currentQuestionIdx);
  }, [currentQuestionIdx]);

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
    return orderedIndexes[currentQueArrIdx + 1];
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
    if (isUpdateQuestion) {
      let currentQuestion = findCurrentQuestion();
      let startIdx = currentQuestionIdx + 1;
      let stopIdx = currentQuestionIdx + currentQuestion?.update?.noOfQues;
      let targetQuestions = updatedQuestions[currentSection][
        "questions"
      ].filter((q) => q.index >= startIdx && q.index <= stopIdx);
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

      let replacedQuestions = replaceQuestions(
        updatedQuestions,
        updatedTargetQuestions
      );
      return replacedQuestions;
    } else {
      return updatedQuestions;
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
      setIsFormComplete(true);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    let firstQuestionIndex = findFirstQuestionIdx();
    if (currentQuestionIdx > firstQuestionIndex) {
      let prevQuestionIdx = findPrevQuestion()?.index;
      setcurrentQuestionIdx(prevQuestionIdx);
    }
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
    // setQuestions(updatedQuestions);
    updatedQuestions = updateQuestions(updatedQuestions);
    setQuestions(updatedQuestions);
    handleNext();
    // setTimeout(()=>{
    // }, [3000]);
  };

  const handleInputChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleSelectChange = (options) => {
    if (Array.isArray(options)) {
      setCurrentAnswer(options.join(",").trim());
    } else {
      setCurrentAnswer(options.trim());
    }
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

  function answerAgain() {
    setIsFormComplete(false);
    setcurrentQuestionIdx(findFirstQuestionIdx());
  }

  const completedActions = (
    <div>
      <label>
        <strong>Great!</strong> We have collected minimal answers for your cover
        letter
      </label>
      <hr />
      <Button
        onClick={answerAgain}
        icon={<RollbackOutlined />}
        btn={"action"}
        type={"primary"}
      >
        Answer again
      </Button>
      <Button type="primary" icon={<FilePdfOutlined />} onClick={generateCover}>
        Generate Cover Letter
      </Button>
    </div>
  );

  if (isFormComplete) {
    return completedActions;
  }

  return (
    <>
      <h2>Please answer following questions: </h2>
      <form>
        <h3>
          {questions[currentSection]["title"]
            ? questions[currentSection]["title"]
            : toSentenceCase(currentSection)}
        </h3>
        {questions[currentSection].questions?.map((question) => {
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
                    type={"primary"}
                    btn={"action"}
                    onClick={handlePrev}
                    disabled={currentQuestionIdx <= findFirstQuestionIdx()}
                    icon={<LeftCircleOutlined />}
                    iconPosition={"left"}
                  >
                    {t("button.previous")}
                  </Button>
                  <Button
                    type="primary"
                    onClick={(e) => handleContinue(e)}
                    icon={<RightCircleOutlined />}
                  >
                    {t("button.continue")}
                  </Button>
                </div>
              </>
            </QuestionWrapper>
          );
        })}
      </form>
    </>
  );
}
