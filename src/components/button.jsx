import React from "react";

function Button({ value, handleClick, selectedOperator, className }) {
  const isOperator = ["+", "-", "*", "/"].includes(value);
  const buttonClass =
    isOperator && value === selectedOperator ? "selected" : "";
  const buttonStyle = value === 0 ? { gridColumn: "span 2" } : {};

  return (
    <button
      className={`${buttonClass} ${className}`}
      style={buttonStyle}
      onClick={() => handleClick(value)}
    >
      {value}
    </button>
  );
}

export default Button;
