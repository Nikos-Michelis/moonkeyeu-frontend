import React, {useEffect} from "react";
import {
    useFloating,
    useInteractions,
    useDismiss,
    useRole,
    FloatingOverlay,
    FloatingFocusManager,
    useTransitionStatus,
} from "@floating-ui/react";

const DialogView = ({ modal, children, onClose }) => {
    const { refs, context } = useFloating({
        open: modal?.isOpen,
        onOpenChange: (open) => { !open && onClose();},
    });

    const { getFloatingProps } = useInteractions([
        useDismiss(context),
        useRole(context, { role: "dialog" }),
    ]);

    const { isMounted, status } = useTransitionStatus(context, {
        duration: 600,
    });

    if (!isMounted) return null;

    return (
        <FloatingOverlay
            lockScroll
            className="dialog__overlay"
            data-state={status}
        >
            <FloatingFocusManager context={context}>
                <div
                    ref={refs.setFloating}
                    className="dialog__root"
                    {...getFloatingProps()}
                    data-state={status}
                >
                    {children}
                </div>
            </FloatingFocusManager>
        </FloatingOverlay>
    );
};


export default DialogView