import React from "react";
import Dropdown from "@/components/modal/dropdown/DropDown.jsx";
import {useModal} from "@/context/ModalProvider.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const BookmarkDropdown = () => {
    const { modals, openModal, closeModal, currentModalId } = useModal();
    const hasValid = currentModalId.includes('BookmarkDropdown')
    const modal = (hasValid && modals[currentModalId]?.type === "dropdown") ? modals[currentModalId] : {};

    const menus = [
        {
            name: "main",
            items: [
                {
                    label: "Remove",
                    leftIcon: <FontAwesomeIcon icon={faTrash} />,
                    onClick: () => {
                        modal?.data?.handleRemove(modal?.data?.bookmark);
                        closeModal(currentModalId);
                    }
                },
                {
                    label: "Edit",
                    leftIcon: <FontAwesomeIcon icon={faPenToSquare} />,
                    onClick: () => openModal("editBookmarkModal", modal?.data, "form")
                },
            ],
        },
    ];

    if (!modal.isOpen) return null;

    return(
        <Dropdown
            modalId={currentModalId}
            status={modal?.data?.status}
            menus={menus}
            style={
                {
                    top: modal?.data?.position?.top,
                    left: modal?.data?.position?.left,
                }
            }
            className="dropdown"
        />
    );
};

export default BookmarkDropdown;

