import React, { useState, useCallback, useEffect } from "react";
import { populateFormObject, checkFormValidity } from "./utility";
import { notification } from "antd";

export const useFormHandler = (apiService, formElementsArray, items, questions, setQuestions) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formObject, setFormObject] = useState(formElementsArray);
  const [isVisible, setIsVisible] = useState(false);

  const initialFormObject = formElementsArray;

  useEffect(()=> {
    setFormObject(formElementsArray)
  }, [formElementsArray])

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
        console.log("Form Submitted", formData);
        // Make and post questions and set Items
        const {question, section, type} = formData;
        // Check if section exist
        let tempQuestions = {...questions};
        let sections = Object.keys(questions);
        if(sections.includes(section)) {
          let lastQuestion = questions[section]['questions'].sort((a, b) => b.index - a.index)[0];
          tempQuestions[section]['questions'].push({
            index: lastQuestion.index + 1,
            question: {
              en: question,
              sv: ""
            },
            type: type,
            answer: {
              en: '',
              sv: ''
            }
          })
          setQuestions(tempQuestions)
        } else {
          let tempQuestions = {...questions};
          let sections = Object.keys(questions).filter(section => section !== 'isNext');
          let lastSection = sections[sections.length-1];
          let lastIndexInThousands = questions[lastSection]['questions'][0]['index'];
          let nextThousandIdx = (lastIndexInThousands + 1000) - lastIndexInThousands % 1000;
          tempQuestions[section] = {
            title: {
              en: section,
              sv: ""
            },
            removed: false,
            questions: [{
              index: nextThousandIdx,
              question: {
                en: question,
                sv: ""
              },
              removed: false,
              type: type
            }]
          }
          setQuestions(tempQuestions)
        }
        notification.success({
          message: "Add Success",
          description: "Successfully Added Question",
        });
        //dispatch(datatableActions.update(apiService, formData));
      }
      resetForm();
      setIsVisible(false);
    }
  }; /*, [formObject,formIsValid])*/

  const handleItemEdit = (id) => {
    handleToggle();
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

  const handleItemDelete = (id) => {
    //dispatch(datatableActions.delete(apiService, id));
  };

  const handleToggle = () => {
    resetForm();
    setIsVisible(!isVisible);
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
  };
};
