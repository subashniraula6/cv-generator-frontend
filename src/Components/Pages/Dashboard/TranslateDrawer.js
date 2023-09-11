import React, { useEffect, useState } from "react";
import { Button, Drawer, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useLanguage } from "../../../context/Language";
import axios from "../../../axios/axios"

const TranslateDrawer = ({
  translate,
  setTranslate,
  currentRecord,
  applicationQuestions,
  handleSave
}) => {
  let [selectedLang, setSelectedLang] = useState(null);
  let [translatedQues, setTranslatedQues] = useState(null);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
  };

  let { languages, language: lang } = useLanguage();

  useEffect(() => {
    // Change translated question
    let langBasedQuestion = applicationQuestions.find(
      (question) => question.language === selectedLang
    );
    let languageBasedQuestionJSON = langBasedQuestion?.question_JSON;
    if(languageBasedQuestionJSON) {
        let question = JSON.parse(languageBasedQuestionJSON)[currentRecord.section][
          "questions"
        ].find((q) => q?.index == currentRecord?.id).question;
        setTranslatedQues(question);
    }
  }, [selectedLang]);

  const handleQuestionChange = (e) => {
    setTranslatedQues(e.target.value)
  }

  const handleTranslate = (e) => {
    let langBasedQuestion = applicationQuestions.find(
        (question) => question.language === selectedLang
    );
    let languageBasedQuestion = JSON.parse(langBasedQuestion.question_JSON);
    let questionsIndex = langBasedQuestion.id
    let updatedQuestions = {
        ...languageBasedQuestion,
        [currentRecord.section]: {
            ...languageBasedQuestion[currentRecord.section],
            ['questions']: languageBasedQuestion[currentRecord.section]['questions'].map(q => {
                if(q.index === currentRecord.id) {
                    return ({
                        ...q,
                        question: translatedQues
                    })
                }
                return q
            })
        }
    }
    handleSave(updatedQuestions, questionsIndex)
    setTranslate(false)
  }

  return (
    <Drawer
      title="Translate Question"
      placement="right"
      onClose={() => setTranslate(false)}
      open={translate}
    >
      <h3>Question in '{lang}'</h3>
      <p>{currentRecord?.question}</p>
      <h4>Translate to:</h4>
      <Select
        onChange={handleLangChange}
        options={languages?.map((lang) => ({
          value: lang?.value,
          label: lang?.label + " " + lang?.value,
        }))}
        placeholder="Select Language"
      />
      <br />
      <br />
      <h3>Question in '{selectedLang}'</h3>
      <p>&bull; {translatedQues || "Not added yet. Please enter your question below"}</p>
      <TextArea
        key={selectedLang}
        rows={4}
        size="large"
        onChange={handleQuestionChange}
        value={translatedQues}
        placeholder="Write something to change question"
        // {...otherProps}
      />
      <br />
      <br />
      <Button style={{ marginRight: "10px" }} onClick={handleTranslate} disabled={!selectedLang}>Save</Button>
      <Button>Cancel</Button>
    </Drawer>
  );
};
export default TranslateDrawer;
