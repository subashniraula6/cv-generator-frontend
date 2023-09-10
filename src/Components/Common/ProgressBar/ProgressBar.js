import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({progress}) => {
  return (
    <div style={{width: "100%"}}>
      <div class="progress">
        <div
          class="progress-bar"
          style={{width : progress + "%"}}
          role="progressbar"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
