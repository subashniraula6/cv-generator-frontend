import { Radio } from "antd";
import React from "react";
import { useLanguage } from "../../../context/Language";

const LanguageSelect = () => {
  let { language, setLanguage } = useLanguage();
  function handleLanguageChange(e) {
    setLanguage(e.target.value);
  }
  
  return (
    <div>
      <Radio.Group value={language} onChange={handleLanguageChange}>
        <Radio.Button value="en">English</Radio.Button>
        <Radio.Button value="sv">Svenska</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default LanguageSelect;
