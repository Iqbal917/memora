import * as React from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick: () => void;
}

export const Button = (props: ButtonProps) => {

    const variantStyles = {
        primary: "bg-purple-dark text-white",
        secondary: "bg-purple-light text-primary"
    }

    const defaultStyles = "rounded-md flex"

    const sizeStyles = {
        sm: "px-2 py-1",
        md: "px-4 py-2",
        lg: "px-6 py-4"
    }

    return (
        <button
            onClick={props.onClick}
            className={`
                ${variantStyles[props.variant]}
                ${defaultStyles}
                ${sizeStyles[props.size]}
            `}
        >
            {props.startIcon? <div className="pr-2"> {props.startIcon} </div>: null} {props.text} {props.endIcon? <div className="pr-2"> {props.startIcon} </div>: null}
        </button>
    )
}