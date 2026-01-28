import React from "react";
import {useModal} from "@/context/ModalProvider.jsx";
import {FloatingPortal} from "@floating-ui/react";
import DropdownView from "@/components/modal/dropdown/DropdownView.jsx";
import DialogView from "@/components/modal/dialog/DialogView.jsx";

export const ModalPortal = ({ children }) => {
    const { closeModal, currentModalId, modals } = useModal();
    const modal = modals[currentModalId];

    const handleClose = () => closeModal(currentModalId);

    return (
        <FloatingPortal id="portal">
            { modal &&
                (
                    modal.type === "dropdown" ? (
                        <DropdownView modal={modal} onClose={handleClose}>
                                {children}
                        </DropdownView>
                    ) : (
                        <DialogView modal={modal} onClose={handleClose}>
                            {children}
                        </DialogView>
                    )
                )
            }
        </FloatingPortal>
    );
};