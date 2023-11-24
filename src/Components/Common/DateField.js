import { Checkbox, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

let endDateStrings = ["leave", "end", "complete"];

const DateField = ({
  handleDateChange,
  question,
  defaultValue,
  ...otherProps
}) => {
  let [isPresentSelected, setIsPresentSelected] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsPresentSelected(e.target.checked);
    handleDateChanged(new Date(), "Present");
  };

  let handleDateChanged = (date, dateStr) => {
    if (isPresentSelected) {
      handleDateChange(new Date(), "Present");
    } else {
      handleDateChange(date, dateStr);
    }
  };

  let findDefaultValue = () => {
    if (!question.answer) {
      return undefined
    }
    if (question.answer?.toLowerCase() === "present") {
      return dayjs();
    }
    return dayjs(question.answer);
  }

  useEffect(() => {
    if (question.answer?.toLowerCase() === "present") {
      setIsPresentSelected(true)
    }
  }, []);
  
  return (
    <>
      <DatePicker
        defaultValue={findDefaultValue}
        onChange={handleDateChanged}
        disabled={isPresentSelected}
        {...otherProps}
      />
      {endDateStrings.some((str) => question.question.includes(str)) && (
        <>
          <Checkbox
            checked={isPresentSelected}
            onChange={handleCheckboxChange}
            style={{ margin: "10px" }}
          ></Checkbox>
          <label>Currently involved</label>
        </>
      )}
    </>
  );
};

export default DateField;
