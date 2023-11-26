import React from "react";
import PopConfirm from "./PopConfirm";
import { DownSquareOutlined, UpSquareOutlined } from "@ant-design/icons";

const UpdateItem = ({
  section,
  questions,
  setQuestions,
  totalGroups,
  group,
  totalItems,
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

  function findStartIndex(groupNo, totalItems) {
    return (groupNo - 1) * totalItems;
  }
  
  function handleOrderDown() {
    if (parseInt(group) === totalGroups) return;
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    let sectionQuestions = updatedQuestions[section]['questions'];
    
    let startArrIndexFirstItem = findStartIndex(group, totalItems);

    // Swap indexes of two item list
    for (let i = startArrIndexFirstItem; i < startArrIndexFirstItem + totalItems; i++) {
      let tempId = sectionQuestions[i].index;
      let tempNo = sectionQuestions[i].no
      sectionQuestions[i].index = sectionQuestions[i + totalItems].index;
      sectionQuestions[i].no = sectionQuestions[i + totalItems].no; 
      sectionQuestions[i + totalItems].index = tempId;
      sectionQuestions[i + totalItems].no = tempNo;
    }
    // order section questions by indexes
    sectionQuestions.sort((a, b) => a.index - b.index);
    updatedQuestions[section]['questions'] = sectionQuestions;
    setQuestions(updatedQuestions);
  }

  function handleOrderUp() {
    if (parseInt(group) === 1) return;
    let updatedQuestions = JSON.parse(JSON.stringify(questions));
    let sectionQuestions = updatedQuestions[section]['questions'];
    
    let startArrIndexFirstItem = findStartIndex(group, totalItems);

    // Swap indexes of two item list
    for (let i = startArrIndexFirstItem; i < startArrIndexFirstItem + totalItems; i++) {
      let tempId = sectionQuestions[i].index;
      let tempNo = sectionQuestions[i].no
      sectionQuestions[i].index = sectionQuestions[i - totalItems].index;
      sectionQuestions[i].no = sectionQuestions[i - totalItems].no; 
      sectionQuestions[i - totalItems].index = tempId;
      sectionQuestions[i - totalItems].no = tempNo;
    }
    // order section questions by indexes
    sectionQuestions.sort((a, b) => a.index - b.index);
    updatedQuestions[section]['questions'] = sectionQuestions;
    setQuestions(updatedQuestions);
  }

  let disabledIconStyle = {
    opacity: "0.5",
    cursor: "not-allowed"
  }
  
  return (
    <div className="manage-item">
      {
        <span style={{ fontSize: "20px" }}>
          <DownSquareOutlined onClick={handleOrderDown} style={parseInt(group)===totalGroups ? disabledIconStyle: {}}/>
          <UpSquareOutlined onClick={handleOrderUp} style={parseInt(group)===1 ? disabledIconStyle: {}}/>
        </span>
      }
      {questions[section].hasOwnProperty("removed") && (
        <span className="pop-confirm">
          <PopConfirm confirm={(e) => handleDeleteItem()} />
        </span>
      )}
    </div>
  );
};

export default UpdateItem;
