import * as Checkbox from "@radix-ui/react-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const CustomCheckbox = React.forwardRef((
    {
        id,
        name = "",
        label = {},
        value = "",
        checked,
        onCheckedChange, // Remove the = {}
        defaultChecked,
        disabled = false,
        required = false,
        className={},
        styles = {},
        ...props
    }, ref) => {
    return (
        <div className="flex align-center">
            <Checkbox.Root
                ref={ref}
                id={id}
                name={name}
                value={value}
                checked={checked}
                onCheckedChange={onCheckedChange}
                defaultChecked={defaultChecked}
                disabled={disabled}
                required={required}
                styles={styles}
                className={className.root || "checkbox__root"}
                {...props}
            >
                <Checkbox.Indicator className={className.indicator || "checkbox__indicator"} styles={styles}>
                    <FontAwesomeIcon icon={faCheck} />
                </Checkbox.Indicator>
            </Checkbox.Root>

            {label && (
                <label className="checkbox__label" htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
});

export default CustomCheckbox;