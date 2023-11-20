import { useState, useEffect, ChangeEvent } from "react";
import Addon from "./Addon";
import InputIcon from "./InputIcon";
import { InputProps } from "../types";
import "./index.css";

export default function InputControl({
  title,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  helper,
  required,
  error,
  disabled,
  readOnly,
  icon,
  addon,
  className,
}: InputProps) {
  const classes = ["form-control"];
  const [val, setVal] = useState(value);

  // validate onchange func
  const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(ev);
  };

  useEffect(() => {
    setVal(value);
  }, [value]);

  if (icon && addon) {
    throw new Error("Only accept lading icon or leading addon !");
  }

  // join props setting for style
  icon && classes.push("leading-icon");
  disabled && classes.push("disabled");
  required && classes.push("required");
  readOnly && classes.push("readonly");
  addon && classes.push("addon");
  error && classes.push("error");
  className && classes.push(className);

  return (
    <div className={classes.join(" ")}>
      {title ? <label>{title}</label> : null}
      <div className="relative form-control-wrapper">
        {icon ? <InputIcon source={icon} /> : null}
        {addon ? <Addon text={addon} /> : null}

        <input
          type={type}
          value={val}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={onInputChange}
          placeholder={placeholder}
          className="form-input"
        />
      </div>
      {helper && !error ? (
        <p className="mt-2 text-sm text-gray-500">{helper}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
