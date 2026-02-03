import React from "react";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";

const DropdownMenu = ({ status, menus, className }) => {
    const handleItemClick = (item) => {
        if (item.onSelect) item.onSelect();
    };

    const addTooltip = (tooltip, key, children) => {
        return (
            <Tooltip key={key} content={tooltip?.message}>
                {children}
            </Tooltip>
        );
    }

    const renderDropdownItem = (item, menuIndex, itemIndex) => {
        const nodeKey = `menu-${menuIndex}-item-${itemIndex}`;
        const itemContent = (
            <RadixDropdown.Item
                key={nodeKey}
                onSelect={() => handleItemClick(item)}
                className={`dropdown__menu-item ${ item?.danger && "dropdown__menu-item--warning" }`}
                disabled={status?.isPending}

            >
                {item.leftIcon && <span className="dropdown__icon">{item.leftIcon}</span>}
                {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
                {item.rightIcon && <span className="dropdown__icon">{item.rightIcon}</span>}
            </RadixDropdown.Item>
        );

        return item.tooltip
            ? addTooltip(item.tooltip, nodeKey, itemContent)
            : itemContent;
    }

    return (
        <RadixDropdown.Portal container={document.getElementById("portal")}>
            <RadixDropdown.Content
                side="bottom"
                align="end"
                sideOffset={6}
                className={`dropdown__content ${className?.content || ""}`}
            >
                {menus.map((menu, menuIndex) => (
                    <div key={menu.name}>
                        {menu.items
                            .filter((item) => !item.danger)
                            .map((item, itemIndex) => renderDropdownItem(item, menuIndex, itemIndex))
                        }

                        {menu.items.some((item) => item.danger) && (
                            <RadixDropdown.Separator className="dropdown__separator"/>
                        )}

                        {menu.items
                            .filter((item) => item.danger)
                            .map((item, itemIndex) => renderDropdownItem(item, menuIndex, itemIndex))
                        }
                    </div>
                ))}
            </RadixDropdown.Content>
        </RadixDropdown.Portal>
    );
}

export default DropdownMenu;
