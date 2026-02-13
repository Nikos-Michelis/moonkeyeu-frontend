import * as Dialog from "@radix-ui/react-dialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ChatForm from "@/components/modal/chat/ChatForm.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";

export default function ChatModal({ open, onOpenChange, children }) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog.Root>
    );
}

function ChatModalContent (
    {
        title,
        description = '',
        closeIcon,
        styles = {},
        classNames = {},
        children,

    }){
    return (
        <Dialog.Portal container={document.getElementById("portal")}>
            <Dialog.Content
                className={`chat__content${classNames.content || ''}`}
                style={{...styles.content }}
            >
                <div className="chat__header bg-stars">
                    <div className="logo">
                        <img src="https://cdn.moonkeyeu.com/media/assets/logo/favicon-cropped-192x192.png" alt="" className="logo__icon"/>
                        {title && <Dialog.Title>{title}</Dialog.Title>}
                    </div>
                    <Dialog.Description className="sr-only">
                        {description || "Details about " + title}
                    </Dialog.Description>
                    <Dialog.Close
                        className={`btn--transparent btn--close ${classNames.closeBtn || ''}`}
                        style={{...styles.closeBtn}}
                    >
                        {closeIcon || <FontAwesomeIcon icon={closeIcon || faAngleDown} />}
                    </Dialog.Close>
                </div>
                <div className={`modal-body ${classNames.body || ''}`} style={styles.body}>
                    {children}
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    );
}

ChatModal.Button = Dialog.Trigger;
ChatModal.Close = Dialog.Close;
ChatModal.Content = ChatModalContent;
