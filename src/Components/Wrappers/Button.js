import React from 'react';
import './Button.css'; // Make sure to adjust the path to your CSS file

const Button = ({ text }) => {
  return (
    <button className="arrow-button" type='button'>
      <span className="button-text">{text}</span>
      <span className="arrow">&#10140;</span>
    </button>
  );
};

export default Button;
