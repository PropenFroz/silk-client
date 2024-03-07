import React from 'react';
import '../styles/button.css';

const Button = ({ onClick, className, children }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
