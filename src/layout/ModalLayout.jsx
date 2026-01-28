import { useModal } from "@/context/ModalProvider.jsx";
import { PromptDialog } from "@/components/modal/dialog/PromptDialog.jsx";
import {VideoDialog} from "@/components/modal/dialog/VideoDialog.jsx";
import {AddBookmarkDialog} from "@/components/modal/dialog/AddBookmarkDialog.jsx";
import {EditBookmarkDialog} from "@/components/modal/dialog/EditBookmarkDialog.jsx";
import BookmarkDropdown from "@/components/modal/dropdown/BookmarkDropdown.jsx";
import ToastPortal from "@/portals/ToastPortal.jsx";
import React from "react";
import LoginDialog from "@/components/modal/dialog/LoginDialog.jsx";
import LaunchDropdown from "@/components/modal/dropdown/LaunchDropdown.jsx";
const ModalLayout = () => {
    const { currentModalId, modals } = useModal();
    const modal = modals[currentModalId] || {};
    return (
        <>
            <VideoDialog />
            <LoginDialog />
            <AddBookmarkDialog />
            <EditBookmarkDialog />
            {modal.type === "prompt" && <PromptDialog key={currentModalId} modalId={currentModalId} /> }
            <BookmarkDropdown />
            <LaunchDropdown/>
            <ToastPortal />
        </>
    );
};


export default ModalLayout;
