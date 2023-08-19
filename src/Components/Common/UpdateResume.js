import React, { useEffect } from "react";
import { useState } from "react";
import CustomModal from "./CustomModal";
import Field from "./Field";
import PopConfirm from "./PopConfirm";
import MagicIcon from "./MagicIcon";

const UpdateResume = ({
  section,
  index,
  questions,
  setQuestions,
  title,
  AIField,
  isLoading,
  setIsLoading,
  ...otherProps
}) => {
  const [tempQuestions, setTempQuestions] = useState(questions);
  const [fieldKey, setFieldKey] = useState(0); // Used for force re-render input fields inside Modal Component

  useEffect(() => {
    setTempQuestions(questions);
  }, [questions]);

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
    let answerStr = options.join(",").trim();
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

  function handleDeleteSection(sectionName) {
    // set removed flag
    setQuestions({
      ...questions,
      [sectionName]: { ...questions[sectionName], removed: true },
    });
  }

  function handleEditSection() {
    setQuestions(tempQuestions);
  }

  function handleCancelSection() {
    setTempQuestions(questions);
    setFieldKey(fieldKey + 1);
  }

  function addDropdownOption(option, section, questionIdx) {
    // add question options
    let updatedQuestions = JSON.parse(JSON.stringify(tempQuestions));
    let quesArrIndex = questions[section]["questions"].findIndex(
      (q) => q.index === questionIdx
      );

    updatedQuestions[section]["questions"][quesArrIndex][
    "options"
    ] += ", " + option;
    // Update DB
    // Fetch DB and set questions state
    setQuestions(updatedQuestions);
  }

  function generateAI(e, section, index) {
    let indexes = [3, 5, 6, 12, 50, 53];
    let payload = {
      questions: questions['basicInfo']['questions'].filter(q => indexes.includes(q.index)).map(q => ({question: q.question, answer: q.answer}))
    }
    let dataInput = "Generate a short and elaborated resume profile summary with words less than 100 from following json: ";
    dataInput += JSON.stringify(payload);

    const requestData = {
      "prompt": "resume maker" + "\n" + dataInput,
      "engine": "text-davinci-003",
      "password": "aeZak1939pska"
    };
    setIsLoading(true);
    fetch('https://eric-sales-bot.onrender.com/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(res => res.json())
    .then(resp => {
      setIsLoading(false);
      let {response} = resp;
      setQuestions({
        ...questions,
        [section]: {
          ...questions[section],
          questions: questions[section]["questions"].map((q) =>
            q.index === index ? { ...q, answer: response } : q
          ),
        },
      });
    })
    .catch(err => {
      setIsLoading(false)
      alert("Open AI error")
    })
  }

  return (
    <div className="manage-section">
      <span className="custom-modal">
        {
          AIField && 
        // <button onClick={(e) => generateAI(e, section, index)}>AI Generate</button>
        <MagicIcon onClick={(e) => generateAI(e, section, index)} />
        }
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
              handleDateChange={(date, dateStr) => handleDateChange(date, dateStr, section, index)}
              addDropdownOption={(e) => addDropdownOption(e, section, index)}
            />
          )}
        </CustomModal>
      </span>
      <span className="pop-confirm">
        <PopConfirm confirm={(e) => handleDeleteSection(section)} />
      </span>
    </div>
  );
};

export default UpdateResume;
