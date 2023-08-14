import React from "react";
import MultiSelect from "./MultiSelect";
import { Input, Select } from "antd";

const Field = ({
  question,
  handleInputChange,
  handleSelectChange,
  addDropdownOption,
  ...otherProps
}) => {
  return (
    <div className="field">
      <div>
        <label> {question.question} </label>
      </div>
      {question.type === "text" && (
        <Input
          type="text"
          onBlur={handleInputChange}
          defaultValue={question.answer}
          {...otherProps}
        />
      )}

      {question.type === "boolean" && (
        <Input
          type="radio"
          // name={question.index}
          // onChange={handleInputChange}
          // defaultValue={question.answer}
          // {...otherProps}
        />
      )}

      {question.type === "select" && (
        <Select
          mode="multiple"
          placeholder="Inserted are removed"
          // value={selectedItems}
          onChange={handleSelectChange}
          style={{
            width: "100%",
          }}
          options={question.options.split(",").map((item) => ({
            value: item.trim(),
            label: item.trim(),
          }))}
          defaultValue={
            question.answer.length
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
