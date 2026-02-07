import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export default function Tooltip(
    {
        children,
        content,
        open,
        defaultOpen,
        onOpenChange,
        delay = 200,
        ...props
    }) {

    return (
        <TooltipPrimitive.Provider delayDuration={delay}>
            <TooltipPrimitive.Root
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
            >
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal container={document.getElementById("portal")}>
                    <TooltipPrimitive.Content className="tooltip__content" side="top" align="center" {...props}>
                        {content}
                        <TooltipPrimitive.Arrow className="tooltip__arrow" width={11} height={5} />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}