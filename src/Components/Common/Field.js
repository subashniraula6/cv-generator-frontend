import React from "react";
import MultiSelect from "./MultiSelect";
import { Input, Select, Switch, DatePicker } from "antd";
import dayjs from 'dayjs';
import { useLanguage } from '../../context/Language';

const { TextArea } = Input;

const Field = ({
  question,
  handleInputChange,
  handleSelectChange,
  handleSlideChange,
  handleDateChange,
  addDropdownOption,
  ...otherProps
}) => {
  let { language: lang } = useLanguage();
  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day');
  };
  const monthFormat = 'MMM YYYY'
  return (
    <div className="field">
      <div>
        <label> {question.question[lang]} </label>
      </div>
      {question.type === "text" && (
        <Input
          type="text"
          onBlur={handleInputChange}
          defaultValue={question.answer[lang]}
          {...otherProps}
        />
      )}

      {question.type === "textArea" && (
        <TextArea 
          rows={4}
          onBlur={handleInputChange}
          defaultValue={question.answer[lang]}
          {...otherProps}
        />
      )}

      {
        question.type === "date" && (
          <DatePicker
            picker="month"
            format={monthFormat}
            onChange={handleDateChange}
            disabledDate={disabledDate}
            defaultValue={question.answer[lang] ? dayjs(question.answer[lang]): undefined}
            {...otherProps}
          />
      )}

      {question.type === "boolean" && (
        <Switch defaultChecked={question.answer[lang] === "yes"? true: false} 
          onBlur={handleSlideChange}
          checkedChildren="Yes"
          unCheckedChildren="No"
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
          options={question.options[lang]?.split(",").map((item) => ({
            value: item.trim(),
            label: item.trim(),
          }))}
          defaultValue={
            question.answer[lang]?.length
              ? question.answer[lang].split(",").map((a) => a.trim())
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
          defaultValue={
            question.answer[lang].length
              ? question.answer[lang].split(",").map((a) => a.trim())
              : undefined
          }
          {...otherProps}
        />
      )}
    </div>
  );
};

export default Field;
