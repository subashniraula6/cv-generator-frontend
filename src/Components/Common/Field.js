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
          size="large"
          onBlur={handleInputChange}
          defaultValue={question.answer[lang]}
          {...otherProps}
        />
      )}

      {question.type === "textArea" && (
        <TextArea 
          rows={4}
          size="large"
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
            size="large"
            onChange={handleDateChange}
            disabledDate={disabledDate}
            defaultValue={question.answer[lang] ? dayjs(question.answer[lang]): undefined}
            {...otherProps}
          />
      )}

      {question.type === "boolean" && (
        <Switch defaultChecked={question.answer[lang] === "yes"? true: false} 
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
          size="large"
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
