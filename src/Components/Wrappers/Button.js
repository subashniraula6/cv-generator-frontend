import React from 'react';
import './Button.css'; 

const Button = ({ text }) => {
  return (
    <button className="arrow-button" type='button'>
      <span className="button-text">{text}</span>
      <span className="arrow">&#10140;</span>
    </button>
  );
};

export default Button;
