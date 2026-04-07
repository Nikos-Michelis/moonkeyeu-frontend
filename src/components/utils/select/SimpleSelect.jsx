import * as Select from "@radix-ui/react-select";
import PropTypes from "prop-types";
import CustomScrollArea from "@/components/utils/CustomScrollArea.jsx";

export default function SimpleSelect(
    {
        name,
        value,
        defaultValue,
        onValueChange,
        onOpenChange,
        open,
        children
    }) {
    return (
        <Select.Root
            name={name}
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            onOpenChange={onOpenChange}
            open={open}
        >
            {children}
        </Select.Root>
    );
}

function SelectContent({ className, children, position = "popper", align = "end" }) {
    return (
        <Select.Portal container={document.getElementById("portal")}>
            <Select.Content
                className={`select__content ${className}`}
                sideOffset={4}
                position={position}
                align={align}
            >
                <CustomScrollArea>
                    <div className="select__options">
                        {children}
                    </div>
                </CustomScrollArea>
            </Select.Content>
        </Select.Portal>
    );
}

SimpleSelect.Button = Select.Trigger;
SimpleSelect.Icon = Select.Icon;
SimpleSelect.Value = Select.Value;
SimpleSelect.Item = Select.Item;
SimpleSelect.ItemText = Select.ItemText;
SimpleSelect.Content = SelectContent;

SimpleSelect.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onValueChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    open: PropTypes.bool,
    children: PropTypes.node,
};