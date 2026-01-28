import React from "react";
import {
    useFloating,
    useInteractions,
    useDismiss,
    useRole,
    autoUpdate,
    offset,
    flip,
    shift, autoPlacement,
} from "@floating-ui/react";

const DropdownView = ({ modal, children, onClose }) => {
    const referenceElement = modal.ref?.current;
    const { refs, floatingStyles, context } = useFloating({
        open: modal?.isOpen,
        onOpenChange: (open) => !open && onClose(),
        strategy: 'fixed',
        placement: 'bottom-end',
        middleware: [
            offset(4),
        ],
        whileElementsMounted: autoUpdate,
        elements: {
            reference: referenceElement
        },
    });

    const { getFloatingProps } = useInteractions([
        useDismiss(context),
        useRole(context, { role: 'menu' })
    ]);

    if (!referenceElement) return null;

    return (
        <div
            ref={refs.setFloating}
            style={{...floatingStyles,}}
            {...getFloatingProps()}
        >
            {children}
        </div>
    );
};

export default DropdownView;