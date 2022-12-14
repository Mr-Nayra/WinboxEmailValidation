import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${props.className}  ${classes.button} `}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
      value={props.value}
    >
      {props.children}
    </button>
  );
};

export default Button;
