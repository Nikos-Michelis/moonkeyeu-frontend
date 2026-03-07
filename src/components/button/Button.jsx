import {forwardRef} from "react";
import PropTypes from "prop-types";

export const Button = forwardRef(function Button(
    {
        children,
        onClick,
        type = "button",
        disabled = false,
        className = "btn btn--primary",
        ...props
    },
    ref
) {
    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </button>
    );
});


Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["submit", "button"]),
    disabled: PropTypes.bool,
    className: PropTypes.string,
};
