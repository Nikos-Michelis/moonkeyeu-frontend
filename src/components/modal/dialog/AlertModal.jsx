import React from "react";
import {AlertDialog} from "radix-ui";
import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";


export default function AlertModal({ open, onOpenChange, children }) {
    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </AlertDialog.Root>
    );
}

function AlertModalContent(
    {
        title,
        description = '',
        overlay = true,
        okText = 'Confirm',
        onOk,
        onCancel,
        status = {},
        styles = {},
        classNames = {},
        children
    }) {

    return (
        <AlertDialog.Portal container={document.getElementById("portal")}>
            { overlay &&
                <AlertDialog.Overlay
                    className={`dialog__overlay ${classNames.content || ''}`}
                    style={{...styles.content }}
                />
            }
            <AlertDialog.Content
                className={`dialog__container ${classNames.content || ''}`}
                style={{...styles.content }}
            >
                <AlertDialog.Title className="dialog__title">
                    { title }
                </AlertDialog.Title>
                <AlertDialog.Description className="sr-only">
                    { description || "Warning - " + title }
                </AlertDialog.Description>
                <div className={`modal-body ${classNames.body || ''}`} style={styles.body}>
                    {children}
                </div>
                <div className="flex align-center justify-end padding-4">
                    <AlertDialog.Cancel asChild>
                        <Button onClick={onCancel} className="btn btn--primary">Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <Button onClick={onOk} className="btn btn--primary btn--warning" disabled={status?.isPending}>
                            {status?.isPending && <FontAwesomeIcon icon={faSpinner} spin />} { okText }
                        </Button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>

        </AlertDialog.Portal>
    )
}

AlertModal.Button = AlertDialog.Trigger;
AlertModal.Action = AlertDialog.Action;
AlertModal.Close = AlertDialog.Cancel;
AlertModal.Content = AlertModalContent;