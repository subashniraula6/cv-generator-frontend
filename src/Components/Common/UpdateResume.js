import React, { useEffect } from "react";
import { useState } from "react";
import CustomModal from "./CustomModal";
import Field from "./Field";
import PopConfirm from "./PopConfirm";

const UpdateResume = ({
  section,
  index,
  questions,
  setQuestions
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

  return (
    <div className="manage-section">
      <span className="custom-modal">
        <CustomModal
          handleEditSection={(e) => handleEditSection()}
          handleCancelSection={(e) => handleCancelSection()}
          title="Edit Skill's"
        >
          {questions?.basicInfo?.questions.find((q) => q.index === index) && (
            <Field
              key={fieldKey}
              question={questions?.basicInfo?.questions.find(
                (q) => q.index === index
              )}
              handleInputChange={(e) => handleInputChange(e, section, index)}
              handleSelectChange={(e) => handleSelectChange(e, section, index)}
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
