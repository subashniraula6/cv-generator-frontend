import React from "react";
import { Rate } from "antd";

const LangRating = ({ rating, options }) => {
  function findValue() {
    // reverse options order =>  DEFAULT is: 5, 4, 3, 2, 1 (Highest to Lowest)
    let orderedOptions = options?.split(',').reverse().join(',');
    let index = orderedOptions?.split(",").map(option => option.trim()).indexOf(rating);
    return index + 1;
  }

  return <Rate defaultValue={findValue()} key={rating}/>;
};

export default LangRating;
