import React from "react";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";

const DropdownMenu = ({ status, menus, className }) => {
    const handleItemClick = (item) => {
        if (item.onClick) item.onClick();
    };

    return (
        <RadixDropdown.Portal container={document.getElementById("portal")}>
            <RadixDropdown.Content
                side="bottom"
                align="end"
                sideOffset={6}
                className={className}
            >
                {menus.map((menu) => (
                    <div key={menu.name}>
                        {menu.items
                            .filter((item) => !item.danger)
                            .map((item, index) => (
                                <RadixDropdown.Item
                                    key={index}
                                    onSelect={() => handleItemClick(item)}
                                    disabled={status?.isPending}
                                    className={`dropdown__menu-item btn--transparent padding-1 ${item.className || ""}`}
                                >
                                    {item.leftIcon && <span className="dropdown__icon">{item.leftIcon}</span>}
                                    {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                                    {item.rightIcon && <span className="dropdown__icon">{item.rightIcon}</span>}
                                </RadixDropdown.Item>
                            ))
                        }
                        {menu.items.some((item) => item.danger) && <RadixDropdown.Separator className="DropdownMenuSeparator" />}
                        {menu.items
                            .filter((item) => item.danger)
                            .map((item, index) => (
                                <RadixDropdown.Item
                                    key={index}
                                    onSelect={() => handleItemClick(item)}
                                    disabled={status?.isPending}
                                    className={`dropdown__menu-item btn--transparent padding-1 text-red-600 ${item.className || ""}`}
                                >
                                    {item.leftIcon && <span className="dropdown__icon">{item.leftIcon}</span>}
                                    {item.label}
                                    {item.rightIcon && <span className="dropdown__icon">{item.rightIcon}</span>}
                                </RadixDropdown.Item>
                            ))}
                    </div>
                ))}
            </RadixDropdown.Content>
        </RadixDropdown.Portal>
    );
};

export default DropdownMenu;
