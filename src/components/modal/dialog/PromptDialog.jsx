import {Button} from "@/components/button/Button.jsx";
import {useModal} from "@/context/ModalProvider.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner, faXmark} from '@fortawesome/free-solid-svg-icons';
import {useEffect} from "react";

export function PromptDialog({ modalId }) {
    const { modals, closeModal } = useModal();
    const modal = modals[modalId] || { isOpen: false, data: {} };
    const {
        title = "Are you sure?",
        message = "This action cannot be undone.",
        details = [],
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
        hasConfirmBtn = true,
        confirmFn = () => {},
    } = modal.data || {};

    const handleClose = () => closeModal(modalId);

    useEffect(() => {
        if (modal?.data) {
            if (modal.data.status?.isSuccess) {
                handleClose(modalId)
            }
        }
    }, [modal]);


    useEffect(() => {
        console.log(modal)
    }, [modals]);
    if (!modal.isOpen) return null;

    return (
        <div className="dialog__container">
            <Button
                onClick={handleClose}
                className="btn--transparent btn--close"
            >
                <FontAwesomeIcon icon={faXmark} />
            </Button>
            <div className="dialog__content padding-block-start-8 padding-block-end-4">
                <div className="dialog__title">
                    <h3>{title}</h3>
                </div>
                <hr className="hr-100-sm"/>
                <div className="dialog__list margin-block-4">
                    <ul>
                        {details.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="dialog__actions">
                <Button
                    className="btn btn--primary"
                    onClick={handleClose}
                >
                    {cancelLabel}
                </Button>
                {hasConfirmBtn &&
                    <Button
                        className="btn btn--primary btn--warning"
                        onClick={confirmFn}
                        disabled={modal?.data?.status?.isPending}
                    >
                        {modal?.data?.status?.isPending && <FontAwesomeIcon icon={faSpinner} spin />} {confirmLabel}
                    </Button>
                }
            </div>
        </div>
    );
}
