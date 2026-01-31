import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBookmark, faEllipsisVertical, faShareFromSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import DropdownMenu from "./DropdownMenu.jsx";

const LaunchDropdown = ({ isBookmarked, status, onBookmark, onRemove, onShare, copied }) => {
    const menus = [
        {
            name: "main",
            items: [
                {
                    label: "Bookmark",
                    leftIcon: <FontAwesomeIcon icon={faBookmark} />,
                    onSelect: () => onBookmark(),
                },
                {
                    label: "Share",
                    leftIcon: <FontAwesomeIcon icon={faShareFromSquare} />,
                    tooltip: { open: copied, message: "Copied to clipboard!" },
                    onSelect: () => onShare(),
                },
                isBookmarked ?
                    {
                        label: "Remove",
                        leftIcon: <FontAwesomeIcon icon={faTrash} />,
                        onSelect: onRemove,
                        danger: true,
                    } : null,
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

            <DropdownMenu status={status} menus={menus} className="dropdown"  />
        </RadixDropdown.Root>
    );
};

export default LaunchDropdown;
