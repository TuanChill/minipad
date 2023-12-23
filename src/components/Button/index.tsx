import { HTMLAttributes } from "react";
import "./index.css";
import { joinClasses } from "../../utils";

type Props = {
  text?: string;
  onClick?: () => void;
  className?: string;
  primary?: boolean;
  secondary?: boolean;
  save?: boolean;
  disabled?: boolean;
  iconLeft?: JSX.Element | string;
  iconRight?: JSX.Element | string;
  type?: "button" | "submit" | "reset";
  otherProps?: [HTMLAttributes<HTMLButtonElement>];
};

export const Button = ({
  text,
  onClick,
  className,
  type = "button",
  disabled = false,
  primary,
  secondary,
  save,
  otherProps,
  iconLeft,
  iconRight,
}: Props) => {
  // join class with props
  const classes = joinClasses(
    "button",
    secondary && "secondary",
    primary && "primary",
    save && "save",
    className
  );

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    >
      {iconLeft}
      {text}
      {iconRight}
    </button>
  );
};
