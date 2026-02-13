import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBookmark, faEllipsisVertical, faRobot, faShareFromSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import DropdownMenu from "./DropdownMenu.jsx";
import {Button} from "@/components/button/Button.jsx";

const LaunchDropdown = ({ isBookmarked, status, onAskAi, onBookmark, onRemove, onShare }) => {
    const menus = [
        {
            name: "main",
            items: [
                {
                    label: "CosmicBot",
                    leftIcon: <FontAwesomeIcon icon={faRobot} />,
                    onSelect: () => onAskAi()
                },
                {
                    label: "Bookmark",
                    leftIcon: <FontAwesomeIcon icon={faBookmark} />,
                    onSelect: () => onBookmark(),
                },
                {
                    label: "Share",
                    leftIcon: <FontAwesomeIcon icon={faShareFromSquare} />,
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
                <Button className="btn--transparent">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </Button>
            </RadixDropdown.Trigger>
            <DropdownMenu status={status} menus={menus} className="dropdown"  />
        </RadixDropdown.Root>
    );
};

export default LaunchDropdown;
