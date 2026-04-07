import  { Popover } from "radix-ui";
import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";

export default function FilterPopover ({ open, onOpenChange, children }) {
    return (
        <Popover.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </Popover.Root>
    )
}

function PopoverContent({ title, onReset, children }) {
    return (
        <Popover.Portal  container={document.getElementById("portal")}>
            <Popover.Content
                className="toolbar__wrapper"
                sideOffset={8}
                align="start"
                collisionPadding={16}
            >
                <div className="toolbar__options">
                    <div className="toolbar__title">
                        <span>{ title }</span>
                    </div>
                    {children}
                </div>

                <div className="toolbar__actions">
                    <Button
                        className="btn--transparent rotation fs-small-200"
                        onClick={onReset}
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </Button>
                </div>
            </Popover.Content>
        </Popover.Portal>
    )
}

FilterPopover.Button = Popover.Trigger;
FilterPopover.Content = PopoverContent;
