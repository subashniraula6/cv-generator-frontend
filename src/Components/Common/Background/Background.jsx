import React from "react";
import "./Background.css";

const Background = ({ children }) => {
  return (
    <>
      <div class="background">
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </div>
      <div className="center-container">{children}</div>
    </>
  );
};

export default Background;
