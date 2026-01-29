import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import DropdownMenu from "./DropdownMenu.jsx";

const LaunchDropdown = ({ isBookmarked, status, onBookmark, onRemove }) => {
    const menus = [
        {
            name: "main",
            items: [
                {
                    label: "Bookmark",
                    leftIcon: <FontAwesomeIcon icon={faBookmark} />,
                    onClick: () => onBookmark(),
                },
                isBookmarked
                    ? {
                        label: "Remove",
                        leftIcon: <FontAwesomeIcon icon={faTrash} />,
                        onClick: onRemove,
                        danger: true,
                    }
                    : null,
            ].filter(Boolean),
        },
    ];

    return (
        <RadixDropdown.Root>
            <RadixDropdown.Trigger asChild>
                <button className="btn--transparent">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </RadixDropdown.Trigger>

            <DropdownMenu status={status} menus={menus} className="dropdown" />
        </RadixDropdown.Root>
    );
};

export default LaunchDropdown;
