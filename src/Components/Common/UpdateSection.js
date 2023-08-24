import React from "react";
import PopConfirm from "./PopConfirm";

const UpdateSection = ({
  section,
  questions,
  setQuestions,
  ...otherProps
}) => {

  function handleDeleteSection(sectionName) {
    // set removed flag
    setQuestions({
      ...questions,
      [sectionName]: { ...questions[sectionName], removed: true },
    });
  }

  return (
    <div className="manage-section">
      {
        questions[section].hasOwnProperty("removed") &&
        <span className="pop-confirm">
          <PopConfirm confirm={(e) => handleDeleteSection(section)} />
        </span>
      }
    </div>
  );
};

export default UpdateSection;
