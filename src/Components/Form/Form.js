import { QuestionWrapper } from "../Wrappers/QuestionWrapper";
import { useState, useEffect } from "react";
import { Button } from "../Common/Button";
import { toSentenceCase } from "../../utils";
import Field from "../Common/Field";
import { useLanguage } from "../../context/Language";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const IGNORED_SECTIONS = ["isNext", "lang"];

export default function Form({ questions, setQuestions, type, handleDownloadPdf, setIsModalOpen }) {
  let [saving, setSaving] = useState(false);
  let [currentQuestionIdx, setcurrentQuestionIdx] = useState(() => {
    // Load saved current question index
    const saved = localStorage.getItem("currentQuestionIdx");
    const initialValue = parseInt(saved);
    if (initialValue) return initialValue;
    // Find first question idx from first section
    let firstSection = Object.keys(questions)[0];
    let firstQuestionIdx = questions[firstSection]["questions"]
      .map((q) => q.index)
      .sort((a, b) => a - b)[0];
    return firstQuestionIdx;
  });
  let [currentAnswer, setCurrentAnswer] = useState("");
  let [currentSection, setCurrentSection] = useState(() => {
    let firstSection = Object.keys(questions)[0];
    return firstSection;
  });
  let [lastEvent, setLastEvent] = useState("");
  let [isRepeatQuestion, setIsRepeatQuestion] = useState(false);
  let [isUpdateQuestion, setIsUpdateQuestion] = useState(false);

  let { language: lang, t } = useLanguage();

  useEffect(() => {
    if (questions?.isNext) {
      handleNext();
    }
    // CHeck if current question index is active/not removed
    let activeIndexes = questions[currentSection]["questions"].map(
      (q) => q.index
    );
    // if removed switch to next last question of section
    if (!activeIndexes.includes(currentQuestionIdx)) {
      setcurrentQuestionIdx(activeIndexes[activeIndexes.length - 1]);
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

    // store to localstorage
    localStorage.setItem("currentQuestionIdx", currentQuestionIdx);
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
    let orderedIndexes = questions[currentSection]["questions"]
      .filter((q) => !q.removed)
      .sort((a, b) => a.index - b.index);
    let currentQueArrIdx = orderedIndexes.findIndex(
      (q) => q.index === currentQuestionIdx
    );
    let skipQuestions = calculateSkipQuestions();
    return orderedIndexes[currentQueArrIdx + 1 + skipQuestions];
  };

  const findPrevQuestion = () => {
    let orderedIndexes = questions[currentSection]["questions"]
      .filter((q) => !q.removed)
      .sort((a, b) => a.index - b.index);
    let currentQueArrIdx = orderedIndexes.findIndex(
      (q) => q.index === currentQuestionIdx
    );
    return orderedIndexes[currentQueArrIdx - 1];
  };

  const updateQuestions = (updatedQuestions) => {
    if (currentQuestionIdx === 4) {
      return {
        ...updatedQuestions,
        [currentSection]: {
          ...updatedQuestions[currentSection],
          questions: updatedQuestions[currentSection]["questions"]
            .map((q) => {
              if (q.index === 5) {
                return {
                  ...q,
                  removed: currentAnswer == "yes" ? false : true,
                };
              }
              return q;
            })
            .sort((a, b) => a.index - b.index),
        },
      };
    } else if (currentQuestionIdx === 2000 && currentAnswer.length > 0) {
      // add language questions
      let existing = questions[currentSection]["questions"].find(
        (q) => q.index === 2001
      );
      if (existing) return updatedQuestions;
      let generated_questions = [
        {
          ...questions[currentSection]["auto_generated_questions"][0],
          index: 2001,
        },
      ];
      return {
        ...updatedQuestions,
        [currentSection]: {
          ...updatedQuestions[currentSection],
          questions: [
            ...updatedQuestions[currentSection]["questions"],
            ...generated_questions,
          ].sort((a, b) => a.index - b.index),
        },
      };
    } else if (currentQuestionIdx === 2000 && currentAnswer.length === 0) {
      // remove
      return {
        ...updatedQuestions,
        [currentSection]: {
          ...updatedQuestions[currentSection],
          questions: updatedQuestions[currentSection]["questions"]
            .filter((q) => q.index <= 2000)
            .sort((a, b) => a.index - b.index),
        },
      };
    } else if (currentQuestionIdx === 2001 && currentAnswer === "yes") {
      let prevQuestion = findPrevQuestion();
      let answers = prevQuestion.answer.split(",");
      if (!answers.length || !answers[0]) {
        handleNext();
        return;
      }
      // remove previously generated questions
      updatedQuestions[currentSection]["questions"] = updatedQuestions[
        currentSection
      ]["questions"]
        .filter((q) => q.index <= currentQuestionIdx)
        .sort((a, b) => a.index - b.index);

      // add new generated questions
      let questionTemplate =
        updatedQuestions[currentSection]["auto_generated_questions"][1];
      if (questionTemplate) {
        let generated_questions = answers.map((a, idx) => {
          return {
            ...questionTemplate,
            index: currentQuestionIdx + (idx + 1),
            question: questionTemplate["question"].replace(/{{\w+}}/, a),
          };
        });
        return {
          ...updatedQuestions,
          [currentSection]: {
            ...updatedQuestions[currentSection],
            questions: [
              ...updatedQuestions[currentSection]["questions"],
              ...generated_questions,
            ].sort((a, b) => a.index - b.index),
          },
        };
      }
    } else if (
      currentQuestionIdx === 2001 &&
      (currentAnswer === "no" || currentAnswer === "")
    ) {
      // delete previously generated questions
      return {
        ...updatedQuestions,
        [currentSection]: {
          ...updatedQuestions[currentSection],
          questions: updatedQuestions[currentSection]["questions"]
            .filter((q) => q.index <= currentQuestionIdx)
            .sort((a, b) => a.index - b.index),
        },
      };
    } else if (isRepeatQuestion && currentAnswer === "yes") {
      let additionalQuestions = updatedQuestions[currentSection][
        "auto_generated_questions"
      ].map((q, idx) => ({
        ...q,
        index: currentQuestionIdx + (idx + 1),
        no: questions[currentSection]["noOfItems"] + 1,
      }));

      // change next question indexes
      let nextQuestionsIdxs = updatedQuestions[currentSection]["questions"]
        .map((q) => q.index)
        .filter((idx) => idx > currentQuestionIdx);
      let updatedSectionQuestions = updatedQuestions[currentSection][
        "questions"
      ].map((q) => {
        if (nextQuestionsIdxs.includes(q.index)) {
          return { ...q, index: q.index + additionalQuestions.length };
        }
        return q;
      });

      if (nextQuestionsIdxs.length > 0) {
        updatedQuestions = {
          ...updatedQuestions,
          [currentSection]: {
            ...updatedQuestions[currentSection],
            noOfItems: updatedQuestions[currentSection]["noOfItems"] + 1,
            questions: [...updatedSectionQuestions].sort(
              (a, b) => a.index - b.index
            ),
          },
        };
      }
      return {
        ...updatedQuestions,
        [currentSection]: {
          ...updatedQuestions[currentSection],
          noOfItems: updatedQuestions[currentSection]["noOfItems"] + 1,
          questions: [
            ...updatedQuestions[currentSection]["questions"],
            ...additionalQuestions,
          ].sort((a, b) => a.index - b.index),
        },
      };
    } else if (isUpdateQuestion) {
      let currentQuestion = findCurrentQuestion();
      let startIdx = currentQuestionIdx + 1;
      let stopIdx = currentQuestionIdx + currentQuestion?.update?.noOfQues;
      let targetQuestions = updatedQuestions[currentSection][
        "questions"
      ].filter((q) => q.index >= startIdx && q.index <= stopIdx && q.template);
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
    let lastSection = findLastSection();
    
    if(currentSection === lastSection && currentQuestionIdx === lastQuestionIndex) {
      //////////////////////////////////////////////////////
      // For downloading when last question is reached
      /////////////////////////////////////////////////////
      setIsModalOpen(true);
    }

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
    e.preventDefault();
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
    // Filter
    if (type === "resume") {
      sections = sections.filter(
        (section) => section !== "targetCompany" && section !== "lang"
      );
    }
    let currentSectionIndex = sections.findIndex(
      (section) => section === currentSection
    );
    let prevSection = sections[currentSectionIndex - 1];
    return prevSection;
  };

  const findNextSection = () => {
    let sections = Object.keys(questions);
    // Filter
    if (type === "resume") {
      sections = sections.filter(
        (section) => section !== "targetCompany" && section !== "lang"
      );
    }
    let currentSectionIndex = sections.findIndex(
      (section) => section === currentSection
    );

    let nextSection;
    nextSection = sections[currentSectionIndex + 1];
    if (currentSection.toLocaleLowerCase() === "others") {
      return "basicInfo";
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

  const findLastSection = () => {
    let sectionsArr = Object.keys(questions).filter(section => {
      return IGNORED_SECTIONS.indexOf(section) < 0;
    }); 
    return sectionsArr[sectionsArr.length - 1];
  }

  const handleContinue = (e) => {
    e.preventDefault();
    setSaving(true);
    e.preventDefault();
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    let currentQuesArrIndex = questions[currentSection]["questions"].findIndex(
      (q) => q.index === currentQuestionIdx
    );

    updatedQuestions[currentSection]["questions"][currentQuesArrIndex][
      "answer"
    ] = currentAnswer;

    updatedQuestions = updateQuestions(updatedQuestions);
    setTimeout(() => {
      setQuestions(updatedQuestions, true);
      setSaving(false);
    }, [700]);
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

  const handleSlideChange = (checked) => {
    setCurrentAnswer(checked === true ? "yes" : "no");
  };

  const handleDateChange = (date, dateStr) => {
    setCurrentAnswer(dateStr);
  };

  const handleFileChange = (imageUrl) => {
    setCurrentAnswer(imageUrl);
  };

  const addDropdownOption = (option) => {
    // add question options
    // console.log("x121: form.js 423");
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    let currentQuesArrIndex = questions[currentSection]["questions"].findIndex(
      (q) => q.index === currentQuestionIdx
    );
    // updatedQuestions[currentSection]["questions"][currentQuesArrIndex][
    //   "options"
    // ] += ", " + option;
    
    // To put the new option on the top
    updatedQuestions[currentSection]["questions"][currentQuesArrIndex][
      "options"
    ] =
      option +
      ", " +
      updatedQuestions[currentSection]["questions"][currentQuesArrIndex][
        "options"
      ];
      // console.log("x121: form.js hawa", updatedQuestions[currentSection]["questions"][currentQuesArrIndex][
      //   "options"
      // ] )

    setQuestions(updatedQuestions);
  };

  const hintStyle = {
    color: "grey",
    marginBottom: "20px",
  };

  return (
    <Spin spinning={saving}>
      <form>
        <h3>
          {questions[currentSection]["title"]
            ? questions[currentSection]["title"]
            : toSentenceCase(currentSection)}
        </h3>
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
                    handleFileChange={handleFileChange}
                    uploadUrl={
                      process.env.REACT_APP_BACKEND_URL + "kneg/upload_image"
                    }
                    addDropdownOption={addDropdownOption}
                  />
                  <div>
                    <Button
                      onClick={handlePrev}
                      type={"primary"}
                      btn={"action"}
                      disabled={currentQuestionIdx <= 1}
                      icon={<ArrowLeftOutlined />}
                      iconPosition={"left"}
                    >
                      {t("button.previous")}
                    </Button>
                    <Button
                      onClick={handleContinue}
                      htmlType="submit"
                      type="primary"
                      icon={<ArrowRightOutlined />}
                      iconPosition={"right"}
                    >
                      {t("button.continue")}
                    </Button>
                  </div>
                  <div style={hintStyle}>
                    <label>
                      Please ensure to <strong>save your responses,</strong> as
                      they may be lost otherwise, when using this website.
                    </label>
                  </div>
                </>
              </QuestionWrapper>
            );
          });
        })}
      </form>
    </Spin>
  );
}
