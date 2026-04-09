import * as Dialog from "@radix-ui/react-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/button/Button.jsx";

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
        showBack,
        description = '',
        overlay= true,
        closeIcon,
        onBack,
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
                    {(showBack || title) &&
                        <div className="dialog__title">
                            {showBack && (
                                <Button className="btn--transparent" onClick={onBack}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </Button>)
                            }
                            {title && <Dialog.Title>{title}</Dialog.Title>}
                        </div>
                    }
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
