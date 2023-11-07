import {HTMLAttributes} from "react";
import joinClasses from "../../utils/joinClasses.ts";
import "./index.css";

type Props = {
    text?: string,
    onClick?: () => void,
    className?: string,
    primary?: boolean,
    secondary?: boolean
    disabled?: boolean,
    iconLeft?: JSX.Element| string,
    iconRight?: JSX.Element| string,
    type?: "button" | "submit" | "reset",
    otherProps?: [HTMLAttributes<HTMLButtonElement>],
}

export const Button = ({text, onClick, className, type= "button" , disabled= false,primary, secondary ,otherProps, iconLeft, iconRight } : Props) => {
    const classes = joinClasses( "button", secondary && "secondary", primary && "primary" ,className);

    return (
        <button className={classes}
                type={type}
                disabled={disabled}
                onClick={onClick}
                {...otherProps}>
            {iconLeft}
            {text}
            {iconRight}
        </button>
    );
};
