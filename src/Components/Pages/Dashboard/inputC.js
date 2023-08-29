import React, { useEffect } from "react";
import {
  Input,
  Form,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  Col,
  Row
} from "antd";
import moment from "moment";
import SelectAddable from "../../Common/SelectAddable";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const InputC = props => {
  let inputElement = null;
  const {
    invalid,
    onChange,
    touched,
    addDropdownOption,
    errorMessage,
    value,
    elementType,
    elementConfig,
    name,
    label,
    onInjectValue,
    required,
    col
  } = props;
  
  let feedbackErrors =
    errorMessage &&
    errorMessage
      .join("\n")
      .split("<br>")
      .map((item, i) => <span key={i}>{item}</span>);

  switch (elementType) {
    case "textarea":
      inputElement = (
        <Input.TextArea
          name={name}
          value={value}
          onChange={onChange}
          {...elementConfig}
        />
      );
      break;
    case "input":
      inputElement = (
        <Input
          name={name}
          value={value}
          onChange={onChange}
          {...elementConfig}
        />
      );
      break;
    case "time-picker":
      inputElement = (
        <TimePicker value={value} onChange={onChange} {...elementConfig} />
      );
      break;
    case "date-picker":
      inputElement = (
        <DatePicker
          {...elementConfig}
          value={value ? moment(value) : null}
          onChange={onChange}
        />
      );
      break;
    case "month-picker":
      inputElement = (
        <MonthPicker
          {...elementConfig}
          value={value ? moment(value) : null}
          onChange={onChange}
        />
      );
      break;
    case "range-picker":
      inputElement = (
        <RangePicker
          {...elementConfig}
          value={value ? moment(value) : null}
          onChange={onChange}
        />
      );
      break;
    case "week-picker":
      inputElement = (
        <WeekPicker
          {...elementConfig}
          value={value ? moment(value) : null}
          onChange={onChange}
        />
      );
      break;
    case "select":
    case "multi-select":
      inputElement = (
        <Select
          name={name}
          value={value}
          onChange={onChange}
          {...elementConfig}
        >
          {elementConfig.options?.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
      break;
    case "select-addable":
      inputElement = (
        <SelectAddable
          name={name}
          value={value?.split(",")}
          handleSelectChange={onChange}
          addDropdownOption={addDropdownOption}
          {...elementConfig}
        >
          {elementConfig.options?.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </SelectAddable>
      );
      break;
    case "radio":
      inputElement = (
        <Radio.Group {...elementConfig} value={value} onChange={onChange} />
      );
      break;
    case "checkbox":
      inputElement = (
        <Checkbox.Group {...elementConfig} value={value} onChange={onChange} />
      );
      break;
    default:
      inputElement = (
        <Input {...elementConfig} value={value} onChange={onChange} />
      );
  }

  return (
    <Row gutter={16}>
      <Col span={col}>
        <Form.Item
          label={label}
          validateStatus={touched ? (invalid ? "error" : "success") : ""}
          hasFeedback
          required={required}
          help={feedbackErrors}
        >
          {inputElement}
        </Form.Item>
      </Col>
    </Row>
  );
};

export default InputC;
