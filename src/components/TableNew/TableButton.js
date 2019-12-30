import React from "react";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";

const iconStyle = {
  marginLeft: "5px",
  fontSize: "18px"
};

const Button = ({
  type,
  name,
  disabled,
  className,
  onClick,
  backgroundColor,
  text,
  arrow,
  arrowDirection
}) => (
  <button
    type={type}
    name={name}
    disabled={disabled}
    className={className}
    onClick={onClick}
    style={{ backgroundColor }}
  >
    {text}
    {arrow ? (
      arrowDirection ? (
        <ArrowDropUp style={iconStyle} />
      ) : (
        <ArrowDropDown style={iconStyle} />
      )
    ) : null}
  </button>
);

export default Button;
