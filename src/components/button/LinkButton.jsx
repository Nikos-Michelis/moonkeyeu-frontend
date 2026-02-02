import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from "react";

export const LinkButton = React.forwardRef((
    {
        to,
        isExternal = false,
        children,
        className,
        disabled = false,
        onClick,
        ...props
    }, ref) => {
    const Component = isExternal ? 'a' : Link;

    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        if (onClick) onClick(e);
    };

    const linkProps = isExternal
        ? { href: to, target: "_blank", rel: "noopener noreferrer" }
        : { to: to };

    return (
        <Component
            ref={ref}
            className={`${className}${disabled ? " btn--disabled" : ""}`}
            onClick={handleClick}
            {...linkProps}
            {...props}
        >
            {children}
        </Component>
    );
});

LinkButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    to: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isExternal: PropTypes.bool,
    target: PropTypes.string,
    rel: PropTypes.string,
    className: PropTypes.string,
};

