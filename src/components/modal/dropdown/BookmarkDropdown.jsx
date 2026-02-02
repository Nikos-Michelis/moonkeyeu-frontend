import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import DropdownMenu from "@/components/modal/dropdown/DropdownMenu.jsx";
import {Button} from "@/components/button/Button.jsx";

const BookmarkDropdown = ({handleRemove, setOpen}) => {
    const menus = [
        {
            name: "main",
            items: [
                {
                    label: "Edit",
                    leftIcon: <FontAwesomeIcon icon={faPenToSquare} />,
                    onSelect: setOpen
                },
                {
                    label: "Remove",
                    leftIcon: <FontAwesomeIcon icon={faTrash} />,
                    onSelect: handleRemove,
                    danger: true
                },

            ],
        },
    ];

    return (
        <RadixDropdown.Root>
            <RadixDropdown.Trigger asChild>
                <Button className="btn--transparent">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </Button>
            </RadixDropdown.Trigger>
            <DropdownMenu menus={menus} />
        </RadixDropdown.Root>
    );
};

export default BookmarkDropdown;