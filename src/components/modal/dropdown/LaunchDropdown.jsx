import React from "react";
import Dropdown from "@/components/modal/dropdown/DropDown.jsx";
import {useModal} from "@/context/ModalProvider.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBookmark, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';

const LaunchDropdown = () => {
    const { modals, closeModal, currentModalId } = useModal();
    const modal = modals[currentModalId]?.type === "dropdown" ? modals[currentModalId] : {};
    const removeBookmarkOption = () => {
        if (!modal?.data?.isBookmarked) return null;

        return {
            label: "Remove",
            leftIcon: <FontAwesomeIcon icon={faTrash} />,
            onClick: () => {
                modal?.data?.handleRemove(modal?.data?.bookmark);
                closeModal(currentModalId);
            }
        };
    };

    const menus = [
        {
            name: "main",
            items: [
                {
                    label: "Bookmark",
                    leftIcon: <FontAwesomeIcon icon={faBookmark} />,
                    onClick: () => modal?.data?.onBookmark()
                },
                removeBookmarkOption()
            ].filter(Boolean)
        },
    ];

    console.log(menus)
    if (!modal.isOpen) return null;

    return(
        <Dropdown
            modalId={currentModalId}
            status={modal?.data?.status}
            menus={menus}
            style={
                {
                    position: 'absolute',
                    top: modal?.data?.position?.top,
                    left: modal?.data?.position?.left,
                }
            }
            className="dropdown"
        />
    );
};

export default LaunchDropdown;

