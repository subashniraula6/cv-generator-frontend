import React from "react";
import { Rate } from "antd";

const LangRating = ({ rating, lang, questionIdx, questions, setQuestions }) => {
  const RatingsMap = {
    en: [
      "Basic skills in speaking and writing",
      "Very good skills in speaking and writing",
      "Good knowledge of speech and writing",
      "Fluid",
      "Mother tongue",
    ],
    sv: [
      "Grundläggande färdigheter i tal och skrift",
      "Mycket goda färdigheter i tal och skrift",
      "Goda kunskaper i tal och skrift",
      "Flytande",
      "Modersmål",
    ],
  };

  function findValue() {
    let index = RatingsMap?.findIndex((rate) => rate === rating);
    return index + 1;
  }

  return <Rate defaultValue={findValue()} key={rating}/>;
};

export default LangRating;
