import React, { useState } from "react";
import Display from "./display";
import Button from "./button";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");
  const [equation, setEquation] = useState("");
  const [lastOperator, setLastOperator] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const handleClick = (value) => {
    if (!isNaN(value) || value === ".") {
      if (currentValue === "0" && value === "0") return; 
      if (currentValue === "0" && value !== ".") {
        setDisplay(value.toString());
        setCurrentValue(value.toString());
      } else {
        const newValue = currentValue + value.toString();
        setDisplay(newValue);
        setCurrentValue(newValue);
      }
      setSelectedOperator(null);
    } else if (value === "C") {
      setDisplay("0");
      setCurrentValue("0");
      setEquation("");
      setLastOperator(null);
      setSelectedOperator(null);
    } else if (value === "+/-") {
      if (currentValue) {
        const toggledValue = (parseFloat(currentValue) * -1).toString();
        setDisplay(toggledValue);
        setCurrentValue(toggledValue);
      }
    } else if (value === "%") {
      if (currentValue) {
        const percentValue = (parseFloat(currentValue) / 100).toString();
        setDisplay(percentValue);
        setCurrentValue(percentValue);
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (lastOperator && currentValue) {
        const newEquation = `${equation} ${currentValue}`;
        const result = eval(newEquation).toString();
        setDisplay(result);
        setEquation(result + ` ${value}`);
        setCurrentValue("0");
      } else if (!lastOperator) {
        setEquation(currentValue + ` ${value}`);
        setDisplay(currentValue);
        setCurrentValue("0");
      }
      setLastOperator(value);
      setSelectedOperator(value);
    } else if (value === "=") {
      if (lastOperator && currentValue) {
        const newEquation = `${equation} ${currentValue}`;
        const result = eval(newEquation).toString();
        setDisplay(result);
        setCurrentValue(result);
        setEquation("");
        setLastOperator(null);
        setSelectedOperator(null);
      }
    }
  };

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="buttons">
        {[
          "C",
          "+/-",
          "%",
          "/",
          7,
          8,
          9,
          "*",
          4,
          5,
          6,
          "-",
          1,
          2,
          3,
          "+",
          0,
          ".",
          "=",
        ].map((value) => (
          <Button
            key={value}
            value={value}
            handleClick={handleClick}
            selectedOperator={selectedOperator}
            className={value === 0 ? "zero" : ""}
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;
