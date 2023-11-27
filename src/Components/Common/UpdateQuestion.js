import React, { useEffect } from "react";
import { useState } from "react";
import CustomModal from "./CustomModal";
import Field from "./Field";
import PopConfirm from "./PopConfirm";
import MagicIcon from "./MagicIcon";
import { useLanguage } from "../../context/Language";
import axios from "../../axios/axios";
import { extractQuestionsAndAnswers } from "../../utils";

const UpdateQuestion = ({
  section,
  index,
  questions,
  setQuestions,
  title,
  AIField,
  AIType = "profileSummary",
  isLoading,
  setIsLoading,
  ...otherProps
}) => {
  const [tempQuestions, setTempQuestions] = useState(questions);
  const [fieldKey, setFieldKey] = useState(0); // Used for force re-render input fields inside Modal Component

  useEffect(() => {
    setTempQuestions(questions);
  }, [questions]);

  const { language: lang } = useLanguage();

  function handleInputChange(e, section, questionIdx) {
    setTempQuestions({
      ...tempQuestions,
      [section]: {
        ...tempQuestions[section],
        questions: tempQuestions[section]["questions"].map((q) =>
          q.index === questionIdx ? { ...q, answer: e.target.value } : q
        ),
      },
    });
  }

  function handleSelectChange(options, section, questionIdx) {
    let answerStr;
    if (Array.isArray(options)) {
      answerStr = options.join(",").trim();
    } else {
      answerStr = options.trim();
    }
    setTempQuestions({
      ...tempQuestions,
      [section]: {
        ...tempQuestions[section],
        questions: tempQuestions[section]["questions"].map((q) =>
          q.index === questionIdx ? { ...q, answer: answerStr } : q
        ),
      },
    });
  }

  function handleDateChange(date, dateStr, section, questionIdx) {
    setTempQuestions({
      ...tempQuestions,
      [section]: {
        ...tempQuestions[section],
        questions: tempQuestions[section]["questions"].map((q) =>
          q.index === questionIdx ? { ...q, answer: dateStr } : q
        ),
      },
    });
  }

  function handleDeleteSection(sectionName, index) {
    // set removed flag
    setQuestions({
      ...questions,
      [sectionName]: {
        ...questions[sectionName],
        questions: questions[sectionName]["questions"].map((question) => {
          if (question.index === index) {
            return { ...question, removed: true };
          }
          return question;
        }),
      },
    });
  }

  function handleEditSection() {
    setQuestions(tempQuestions);
  }

  function handleCancelSection() {
    setTempQuestions(questions);
    setFieldKey(fieldKey + 1);
  }

  const handleFileChange = (imageUrl, section, questionIdx) => {
    setTempQuestions({
      ...tempQuestions,
      [section]: {
        ...tempQuestions[section],
        questions: tempQuestions[section]["questions"].map((q) =>
          q.index === questionIdx ? { ...q, answer: imageUrl } : q
        ),
      },
    });
  };

  function addDropdownOption(option, section, questionIdx) {
    // add question options
    console.log("X121: updatequestion.js 113");
    let updatedQuestions = JSON.parse(JSON.stringify(tempQuestions));
    let quesArrIndex = questions[section]["questions"].findIndex(
      (q) => q.index === questionIdx
    );

    // To put the new option on the top
    // updatedQuestions[section]["questions"][quesArrIndex]["options"] +=
    //   ", " + option;
    updatedQuestions[section]["questions"][quesArrIndex]["options"] =
      option +
      ", " +
      updatedQuestions[section]["questions"][quesArrIndex]["options"];
    // console.log(
    //   "x121",
    //   updatedQuestions[section]["questions"][quesArrIndex]["options"]
    // );
    // Update DB
    // Fetch DB and set questions state
    setQuestions(updatedQuestions);
  }

  function generateAI(e, section, index) {
    if (AIType === "profileSummary") {
      let questionIndexes = [6, 7, 4000]; // Relevent questions for generating profile summary
      // let payload = extractQuestionsAndAnswers(questions);
      let payload = questions['basicInfo']['questions'].concat(questions['profileSummary']['questions'])
      .filter(q => questionIndexes.includes(q.index))
      .map(q => ({
        question: q.question,
        answer: q.answer
      }));
      
      let dataInput =
        "Generate a short and elaborated resume profile summary with words less than 100 from the following json: ";
      dataInput += JSON.stringify(payload);

      const requestData = {
        prompt: "resume maker" + "\n" + dataInput,
        engine: "text-davinci-003",
        password: "aeZak1939pska",
      };
      setIsLoading(true);
      axios
        .post("/chat", JSON.stringify(requestData))
        .then(({ data }) => {
          setIsLoading(false);
          let { response } = data;
          if (Array.isArray(response) && response[1] === 500) {
          } else {
            setQuestions({
              ...questions,
              [section]: {
                ...questions[section],
                questions: questions[section]["questions"].map((q) =>
                  q.index === index ? { ...q, answer: response } : q
                ),
              },
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          alert("Open AI error");
        });
    } else if (AIType === "workSummary") {
      // let payload = extractQuestionsAndAnswers(questions);
      let payload = questions['workExperience']['questions']
      .filter(q => (q.index > (index-6)) && q.index <= index)
      .map(q => ({
        question: q.question,
        answer: q.answer
      }));
      console.log("payload", payload)
      let dataInput =
        "Generate a short and elaborated resume work description summary with words less than 100 from following json: ";
      dataInput += JSON.stringify(payload);
      const requestData = {
        prompt: "resume maker" + "\n" + dataInput,
        engine: "text-davinci-003",
        password: "aeZak1939pska",
      };
      setIsLoading(true);
      axios
        .post("/chat", JSON.stringify(requestData))
        .then(({ data }) => {
          setIsLoading(false);
          let { response } = data;
          if (Array.isArray(response) && response[1] === 500) {
          } else {
            setQuestions({
              ...questions,
              [section]: {
                ...questions[section],
                questions: questions[section]["questions"].map((q) =>
                  q.index === index ? { ...q, answer: response } : q
                ),
              },
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          alert(err);
        });
    }
  }

  return (
    <span className="manage-question">
      <span className="custom-modal">
        {AIField && (
          <MagicIcon onClick={(e) => generateAI(e, section, index)} />
        )}
        <CustomModal
          handleEditSection={(e) => handleEditSection()}
          handleCancelSection={(e) => handleCancelSection()}
          title={title}
        >
          {questions[section].questions.find((q) => q.index === index) && (
            <Field
              key={fieldKey}
              question={questions[section]?.questions.find(
                (q) => q.index === index
              )}
              handleInputChange={(e) => handleInputChange(e, section, index)}
              handleSelectChange={(e) => handleSelectChange(e, section, index)}
              handleDateChange={(date, dateStr) =>
                handleDateChange(date, dateStr, section, index)
              }
              handleFileChange={(url) => handleFileChange(url, section, index)}
              uploadUrl={"https://fakeql.com/upload"}
              addDropdownOption={(e) => addDropdownOption(e, section, index)}
            />
          )}
        </CustomModal>
      </span>
      {questions[section].questions
        .find((q) => q.index === index)
        ?.hasOwnProperty("removed") && (
        <span className="pop-confirm">
          <PopConfirm confirm={(e) => handleDeleteSection(section, index)} />
        </span>
      )}
    </span>
  );
};

export default UpdateQuestion;
