import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ open, onOpenChange, children }) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog.Root>
    );
}

function ModalContent(
    {
        title,
        description = '',
        overlay= true,
        closeIcon,
        styles = {},
        classNames = {},
        children,

    }) {
    return (
        <Dialog.Portal container={document.getElementById("portal")}>
            { overlay &&
                <Dialog.Overlay
                    className={`dialog__overlay ${classNames.overlay || ''}`}
                    style={styles.overlay}
                />
            }
            <Dialog.Content
                className={`dialog__container ${classNames.content || ''}`}
                style={{...styles.content }}
            >
                <div
                    className={`flex align-center justify-space-between${classNames.header || ''}`}
                    style={styles.header}
                >
                    <Dialog.Title className="dialog__title">{title}</Dialog.Title>
                    <Dialog.Description className="sr-only">
                        {description || "Details about " + title}
                    </Dialog.Description>
                    <Dialog.Close
                        className={`btn--transparent btn--close ${classNames.closeBtn || ''}`}
                        style={{...styles.closeBtn}}
                    >
                        {closeIcon || <FontAwesomeIcon icon={closeIcon || faXmark} />}
                    </Dialog.Close>
                </div>
                <div className={`modal-body ${classNames.body || ''}`} style={styles.body}>
                    {children}
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    );
}

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
