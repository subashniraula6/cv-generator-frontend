import { Radio, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../context/Language";
import { removeLocalUserProfiles } from "../../../utils";

const LanguageSelect = () => {  
  let { languages, language, setLanguage } = useLanguage("en");
  
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
        {
          languages.map(l => <Select.Option value={l.value}>{l.label} ({l.value})</Select.Option>)
        }
      </Select>
    </div>
  );
};

export default LanguageSelect;
