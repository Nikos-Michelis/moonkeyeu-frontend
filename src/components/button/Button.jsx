import React from "react";
import PropTypes from "prop-types";

export const Button = React.forwardRef((
        {
            children,
            onClick,
            type = "button",
            disabled = false,
            className = "btn btn--primary",
            ...props
        }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={`${className}${disabled ? " btn--disabled" : ""}`}
                onClick={onClick}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }
);


Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["submit", "button"]),
    disabled: PropTypes.bool,
    className: PropTypes.string,
};
