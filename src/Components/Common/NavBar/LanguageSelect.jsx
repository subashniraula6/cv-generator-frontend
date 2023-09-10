import { Radio, Select } from "antd";
import React from "react";
import { useLanguage } from "../../../context/Language";
import { removeLocalUserProfiles } from "../../../utils"

const LanguageSelect = () => {
  let { language, setLanguage } = useLanguage("en");
  function setLocale(value) {
    setLanguage(value);
    removeLocalUserProfiles();
  }

  return (
    <div>
      <Select
        value={language}
        onChange={(v) => setLocale(v)}
        style={{ marginLeft: 10 }}
      >
        <Select.Option value="en">English (en)</Select.Option>
        <Select.Option value="sv">Svenska (sv)</Select.Option>
      </Select>
    </div>
  );
};

export default LanguageSelect;
