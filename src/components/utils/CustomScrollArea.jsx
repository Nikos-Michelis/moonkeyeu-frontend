import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import React from "react";

export default function CustomScrollArea({ children, className = "" }) {
    return (
        <RadixScrollArea.Root className={`scroll__root ${className}`}>
            <RadixScrollArea.Viewport className="scroll__viewport">
                {children}
            </RadixScrollArea.Viewport>

            <RadixScrollArea.Scrollbar className="scroll__scrollbar" orientation="vertical">
                <RadixScrollArea.Thumb className="scroll__thumb" />
            </RadixScrollArea.Scrollbar>

            <RadixScrollArea.Scrollbar className="scroll__scrollbar" orientation="horizontal">
                <RadixScrollArea.Thumb className="scroll__thumb" />
            </RadixScrollArea.Scrollbar>

            <RadixScrollArea.Corner className="ScrollAreaCorner" />
        </RadixScrollArea.Root>
    );
}