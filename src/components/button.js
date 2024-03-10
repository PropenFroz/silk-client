import React from 'react';
import '../styles/button.css'; // Import CSS file for button styling

const Button = ({ onClick, className, children }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
