import React from "react";
import InputC from "./inputC";

export const populateFormObject = (
  eventValue,
  formObject,
  inputIdentifier,
  handlerType = "Change"
) => {
  let response = {};
  let value = "";

  //console.log("value before", eventValue);

  if (eventValue == null) {
    //console.log('val is empty');
    value = "";
  } else if (handlerType !== "Inject" && eventValue.target) {
    //console.log('val is original value', eventValue.target.value);
    value = eventValue.target.value;
  } else {
    //console.log('val is injected');
    value = eventValue;
  }
  //console.log('value after', value);
  
  const checkValidity = checkFormValidity(
    value,
    formObject[inputIdentifier].validation
  );
  const updatedFormElement = updateObject(formObject[inputIdentifier], {
    value: value,
    valid: checkValidity.isValid,
    errorMessage: checkValidity.errorMessage,
    touched: true
  });
  const updatedForm = updateObject(formObject, {
    [inputIdentifier]: updatedFormElement
  });

  let formIsValid = true;
  for (let inputIdentifier in updatedForm) {
    let ignoredKeys = ['isCustom', 'originalId', 'originalSection'];
    if(ignoredKeys.includes(inputIdentifier)) continue; //skip

    formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
  }
  response["updatedForm"] = updatedForm;
  response["formIsValid"] = formIsValid;
  return response;
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkFormValidity = (value, rules) => {
  let isValid = true;
  let input_value = typeof value === "string" ? value.trim() : value;
  let errorMessage = [];

  if (!rules) {
    return true;
  }

  if (rules.required && isEmpty(input_value)) {
    errorMessage.push("Field cannot be empty");
    isValid = false;
  }

  if (rules.minLength && input_value.length < rules.minLength) {
    errorMessage.push(`At least ${rules.minLength} characters needed.`);
    isValid = false;
  }

  if (rules.maxLength && input_value.length > rules.maxLength) {
    errorMessage.push(`You can't use more than ${rules.maxLength} characters.`);
    isValid = false;
  }

  const email_pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (rules.isEmail && !email_pattern.test(input_value)) {
    errorMessage.push("Enter a valid email address");
    isValid = false;
  }

  if (rules.isPassword) {
    let validated = true;

    if (input_value.length < 8 || input_value.length > 24) {
      errorMessage.push("Should contain between 8 and 24 characters");
      validated = false;
    }
    if (!/\d/.test(input_value)) {
      errorMessage.push("Should contain at least one digit");
      validated = false;
    }
    if (!/(?=.*[a-z])/.test(input_value)) {
      errorMessage.push("Should contain at least one lower case");
      validated = false;
    }
    if (!/(?=.*[A-Z])/.test(input_value)) {
      errorMessage.push("Should contain at least one upper case");
      validated = false;
    }
    if (!/(?=.*[#$^\-_+=!*()@%&])/.test(input_value)) {
      errorMessage.push(
        "Should contain at least one special character #$^\\-_+=!*()@%&"
      );
      validated = false;
    }

    if (!validated) isValid = false;
  }

  const ip_pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  if (rules.isIp && !ip_pattern.test(input_value)) {
    errorMessage.push("Enter a valid IP address");
    isValid = false;
  }

  const numeric_pattern = /^\d+$/;
  if (rules.isNumeric && !numeric_pattern.test(input_value)) {
    errorMessage.push("Field must be Numeric");
    isValid = false;
  }

  if (rules.isFile && !isEmpty(input_value)) {
    if (
      rules.uploadedFileLimit &&
      Object.keys(input_value).length > rules.uploadedFileLimit
    ) {
      errorMessage.push(
        `You can only upload ${rules.uploadedFileLimit} file(s)!`
      );
      isValid = false;
    }
    for (const key in input_value) {
      const isAllowedSize =
        input_value[key].size / 1024 / 1024 < rules.allowedSize;
      if (!isAllowedSize) {
        errorMessage.push(
          `${input_value[key].name} must be smaller than ${
            rules.allowedSize
          }MB!`
        );
        isValid = false;
      }
    }
  }

  return { isValid: isValid, errorMessage: errorMessage };
};

export const formGenerator = (objectForm, onChange, onInjectValue, addDropdownOption, action) => {
  const formElementsArray = [];
  for (const key in objectForm) {
    formElementsArray.push({
      id: key,  
      config: objectForm[key]
    });
  }
  
  return formElementsArray.map(formElement => {
    if(action == 'edit' && formElement.id == 'section') return null;
    return <InputC
      key={formElement.id}
      name={formElement.id}
      col={formElement.config.col}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      invalid={!formElement.config.valid}
      required={formElement.config.validation.required}
      errorMessage={formElement.config.errorMessage}
      touched={formElement.config.touched}
      value={formElement.config.value}
      label={formElement.config.label}
      onChange={event => onChange(event, formElement.id)}
      addDropdownOption={(value) => addDropdownOption(formElement.id, value)}
      onInjectValue={onInjectValue}
    />
  });
};
export const isEmpty = value =>
  typeof value === "undefined" ||
  value === null ||
  value === "" ||
  Object.values(value).every(item => item === false) ||
  (Array.isArray(value) && value.length === 0);
