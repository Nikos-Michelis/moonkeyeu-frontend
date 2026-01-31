import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export default function Tooltip({ children, delay = 200, open, onOpenChange }) {
    return (
        <TooltipPrimitive.Provider delayDuration={delay}>
            <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
                {children}
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}

function TooltipContent({ children, side = "top", ...props }) {
    return (
        <TooltipPrimitive.Portal container={document.getElementById("portal")}>
            <TooltipPrimitive.Content
                side={side}
                sideOffset={5}
                className="tooltip__content"
                {...props}
            >
                {children}
                <TooltipPrimitive.Arrow className="tooltip__arrow" width={11} height={5} />
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    );
}

Tooltip.Button = TooltipPrimitive.Trigger;
Tooltip.Content = TooltipContent;