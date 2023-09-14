import React, { useState, useCallback, useEffect } from "react";
import { populateFormObject, checkFormValidity } from "./utility";
import { notification } from "antd";

export const useFormHandler = (
  apiService,
  formElementsArray,
  items,
  questions,
  handleSave,
  saveDelete,
  questionsIndex,
) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formObject, setFormObject] = useState(formElementsArray);
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState(null);

  const initialFormObject = formElementsArray;

  useEffect(() => {
    setFormObject(formElementsArray);
  }, [formElementsArray]);

  const resetForm = useCallback(() => {
    setFormObject(initialFormObject);
    setFormIsValid(false);
  }, [initialFormObject]);

  const handleFormChange = (event, inputIdentifier) => {
    const formPopulation = populateFormObject(
      event,
      formObject,
      inputIdentifier
    );
    setFormObject(formPopulation["updatedForm"]);
    setFormIsValid(formPopulation["formIsValid"]);
  };

  const handleFormInject = (value, inputIdentifier) => {
    const formPopulation = populateFormObject(
      value,
      formObject,
      inputIdentifier,
      "Inject"
    );
    setFormObject(formPopulation["updatedForm"]);
    setFormIsValid(formPopulation["formIsValid"]);
  };

  const handleFormSubmit = /*useCallback(*/ () => {
    if (formIsValid) {
      const formData = {};
      for (let formElementIdentifier in formObject) {
        formData[formElementIdentifier] =
          formObject[formElementIdentifier].value;
      }
      if (window.location.hash === "#Create") {
        //dispatch(datatableActions.create(apiService, formData));
      } else {
        // Make and post questions and set Items
        const { id, question, section, type, originalSection, originalId, subSection } =
          formData;
        // Check if section exist
        let tempQuestions = { ...questions };
        let sections = Object.keys(questions);
        if (action == "add") {
          if (sections.includes(section)) {
            // append to existing section
            let lastQuestion = questions[section]["questions"].sort(
              (a, b) => b?.index - a?.index
            )[0];
            tempQuestions[section]["questions"].push({
              index: lastQuestion
                ? lastQuestion.index + 1
                : sections.indexOf(section) * 1000,
              isCustom: true,
              question,
              type: type,
              answer: "",
            });

            handleSave(tempQuestions, questionsIndex);
          } else {
            // create new section and add new question
            let tempQuestions = { ...questions };
            let sections = Object.keys(questions).filter(
              (section) => section !== "isNext"
            );
            let lastSection = sections[sections.length - 1];
            let lastIndexInThousands = sections.indexOf(lastSection) * 1000;
            let nextThousandIdx = lastIndexInThousands + 1000;
            tempQuestions[section] = {
              title: section,
              removed: false,
              questions: [
                {
                  index: nextThousandIdx,
                  isCustom: true,
                  question,
                  removed: false,
                  type: type,
                  answer: "",
                },
              ],
            };
            handleSave(tempQuestions, questionsIndex);
          }
          notification.success({
            message: "Add Success",
            description: "Successfully Added Question",
          });
        } else if (action == "edit") {
          if (section == originalSection) {
            let arrIdx = tempQuestions[section][subSection].findIndex(
              (q) => q.index === id
            );
            tempQuestions[section][subSection][arrIdx] = {
              ...tempQuestions[section][subSection][arrIdx],
              question,
              type,
            };
            handleSave(tempQuestions, questionsIndex);
          } else {
            // remove question from original index
            tempQuestions[originalSection][subSection] = tempQuestions[
              originalSection
            ][subSection].filter((q) => q?.index !== id);

            if (sections.includes(section)) {
              // perform add
              let lastQuestion = questions[section][subSection].sort(
                (a, b) => b?.index - a?.index
              )[0];
              tempQuestions[section][subSection].push({
                index: lastQuestion
                  ? lastQuestion.index + 1
                  : sections.indexOf(section) * 1000,
                isCustom: true,
                question,
                type: type,
                answer: "",
              });
              handleSave(tempQuestions, questionsIndex);
            } else {
              // create new section and add new question
              let tempQuestions = { ...questions };
              let sections = Object.keys(questions).filter(
                (section) => section !== "isNext"
              );
              let lastSection = sections[sections.length - 1];
              let lastIndexInThousands = sections.indexOf(lastSection) * 1000;
              let nextThousandIdx = lastIndexInThousands + 1000;
              tempQuestions[section] = {
                title: section,
                removed: false,
                questions: [
                  {
                    index: nextThousandIdx,
                    isCustom: true,
                    question,
                    removed: false,
                    type: type,
                    answer: "",
                  },
                ],
              };
              handleSave(tempQuestions, questionsIndex);
            }
          }
        }
        //dispatch(datatableActions.update(apiService, formData));
      }
      resetForm();
      setIsVisible(false);
    }
  }; /*, [formObject,formIsValid])*/

  const handleLanguageAdd = () => {
    if (formIsValid) {
      const formData = {};
      for (let formElementIdentifier in formObject) {
        formData[formElementIdentifier] =
          formObject[formElementIdentifier].value;
      }
      handleSave(formData)
    }
  }

  const handleItemEdit = (id) => {
    handleToggle("edit");
    const item = items.find((item) => item.id === id);
    const updatedForm = {
      ...formObject,
    };
    
    for (const key in item) {
      if (formObject.hasOwnProperty(key)) {
        const updatedFormElement = {
          ...updatedForm[key],
        };
        updatedFormElement.value = item[key];
        const checkValidity = checkFormValidity(
          updatedFormElement.value,
          updatedFormElement.validation
        );
        updatedFormElement.valid = checkValidity.isValid;
        updatedFormElement.errorMessage = checkValidity.errorMessage;
        updatedFormElement.touched = true;
        updatedForm[key] = updatedFormElement;
      } else {
        updatedForm[key] = {
          value: item[key],
          elementConfig: {
            hidden: true,
          },
          validation: {},
          valid: !!item[key],
        };
      }
    }
    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    setFormObject(updatedForm);
    setFormIsValid(formIsValid);
  };

  const handleItemDelete = (section, id) => {
    saveDelete(section, id);
  };

  const handleToggle = (action) => {
    resetForm();
    setIsVisible(!isVisible);
    setAction(action);
  };

  return {
    handleFormChange,
    handleFormInject,
    handleFormSubmit,
    handleItemEdit,
    handleItemDelete,
    handleToggle,
    formIsValid,
    formObject,
    isVisible,
    action,
    handleLanguageAdd
  };
};
