import React from "react";
import MultiSelect from "./MultiSelect";
import { Input, Select, Switch, message, Checkbox } from "antd";
import DateField from "./DateField";
import dayjs from "dayjs";
import { useLanguage } from "../../context/Language";
import ImageUpload from "./ImageUpload";

const { TextArea } = Input;

const Field = ({
  question,
  handleInputChange,
  handleSelectChange,
  handleSlideChange,
  handleDateChange,
  handleCheckboxChange,
  handleFileChange,
  addDropdownOption,
  uploadUrl,
  ...otherProps
}) => {
  let { language: lang } = useLanguage();
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };
  const questionStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: '10px'
  };
  const hintStyle = {
    color: "grey",
    marginBottom: "20px",
  };
  const monthFormat = "MMM YYYY";
  return (
    <div className="field">
      <div style={questionStyle}>
        <label> {question.question} </label>
      </div>
      <div style={hintStyle}>
        <label> {question?.hint || ""} </label>
      </div>
      {question.type === "text" && (
        <Input
          type="text"
          size="large"
          onBlur={handleInputChange}
          defaultValue={question.answer}
          {...otherProps}
        />
      )}

      {question.type === "textArea" && (
        <TextArea
          rows={4}
          size="large"
          onBlur={handleInputChange}
          defaultValue={question.answer}
          {...otherProps}
          style={{ resize: "none" }}
        />
      )}

      {question.type === "file" && (
        <ImageUpload
          multiple={false}
          url={uploadUrl}
          handleFileChange={handleFileChange}
          size="small"
          defaultValue={question.answer}
          {...otherProps}
        />
      )}

      {question.type === "date" && (
        <DateField 
          picker="month"
          format={monthFormat}
          size="large"
          handleDateChange={handleDateChange}
          disabledDate={disabledDate}
          question={question}
          {...otherProps}
        />
      )}

      {question.type === "boolean" && (
        <Switch
          defaultChecked={question.answer === "yes" ? true : false}
          onChange={handleSlideChange}
          checkedChildren="Yes"
          unCheckedChildren="No"
          size="large"
          {...otherProps}
        />
      )}

      {question.type === "select" && (
        <Select
          placeholder="Inserted are removed"
          onChange={handleSelectChange}
          style={{
            width: "100%",
          }}
          size="large"
          options={question.options?.split(",").map((item) => ({
            value: item.trim(),
            label: item.trim(),
          }))}
          defaultValue={
            question.answer?.length
              ? question.answer.split(",").map((a) => a.trim())
              : undefined
          }
          {...otherProps}
        />
      )}

      {question.type === "textSelect" && (
        <MultiSelect
          addDropdownOption={addDropdownOption}
          handleSelectChange={handleSelectChange}
          question={question}
          size="large"
          defaultValue={
            question.answer.length
              ? question.answer.split(",").map((a) => a.trim())
              : undefined
          }
          {...otherProps}
        />
      )}
    </div>
  );
};

export default Field;
