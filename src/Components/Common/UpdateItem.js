import React from "react";
import PopConfirm from "./PopConfirm";

const UpdateItem = ({
  section,
  questions,
  setQuestions,
  group,
  ...otherProps
}) => {
  function handleDeleteItem() {
    // remove items
    let updatedQuestions = {
      ...questions,
      [section]: {
        ...questions[section],
        noOfItems: questions[section]["noOfItems"] - 1,
        questions: questions[section]["questions"].filter(
          (q) => q.no !== parseInt(group)
        ),
      },
    };
    setQuestions(updatedQuestions);
  }

  return (
    <div className="manage-item">
      {questions[section].hasOwnProperty("removed") && (
        <span className="pop-confirm">
          <PopConfirm confirm={(e) => handleDeleteItem()} />
        </span>
      )}
    </div>
  );
};

export default UpdateItem;
