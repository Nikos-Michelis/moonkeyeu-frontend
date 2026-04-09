import {useMemo, useState} from "react";
import * as Popover from "@radix-ui/react-popover";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import CustomScrollArea from "@/components/utils/CustomScrollArea.jsx";

const OPTIONS_LENGTH = 20;
function SearchableSelect(
    {
        options = [],
        field,
        placeholder,
        value,
        defaultValue,
        onSelectChange,
        onSelectClear,
        isSearchable = true,
        className,
    }) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const selectedLabel = useMemo(
        () => options.find((option) => option?.id?.toString() === value?.toString())?.name ?? null,
        [options, value]
    );
    const btnPlaceholder = selectedLabel || placeholder;
    const isSelected = !!selectedLabel && value?.toString() !== defaultValue?.toString();
    const paramValue = (value ?? defaultValue)?.toString();
    const filteredOptions = useMemo(
        () => options.filter((o) => o.name.toLowerCase().includes(searchValue.toLowerCase())),
        [options, searchValue]
    );

    const handleSelect = (option) => {
        onSelectChange({[field]: option.id})
        setOpen(false);
        setSearchValue('');
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onSelectClear(field);
        setSearchValue('');
    };

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <div className={`select__trigger lift lift--md ${className?.button ?? ""}`}>
                    {btnPlaceholder.length > OPTIONS_LENGTH ? (
                        <Tooltip content={btnPlaceholder}>
                            <div className="select__trigger--ellipsis">{btnPlaceholder}</div>
                        </Tooltip>
                    ) : (
                        <div>{btnPlaceholder}</div>
                    )}
                    <FontAwesomeIcon
                        icon={isSelected ? faXmark : faAngleDown}
                        onClick={isSelected ? handleClear : undefined}
                    />
                </div>
            </Popover.Trigger>
            <Popover.Portal container={document.getElementById("portal")}>
                <Popover.Content
                    className={`select__content ${className?.content ?? ""}`}
                    sideOffset={4}
                    align="start"
                >
                    {isSearchable && (
                        <div className="select__search">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                autoFocus
                            />
                        </div>
                    )}
                    <CustomScrollArea>
                        <ul className="select__options">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <li
                                        key={option.id}
                                        className={`select__option ${paramValue === option.id.toString() ? "select__option--selected" : ""}`}
                                        onClick={() => handleSelect(option)}
                                    >
                                        {option.name.length > OPTIONS_LENGTH ? (
                                            <Tooltip content={option.name}>
                                                <div className="select__option--ellipsis">{option.name}</div>
                                            </Tooltip>
                                        ) : (
                                            <div>{option.name}</div>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li>No results found</li>
                            )}
                        </ul>
                    </CustomScrollArea>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}

export default SearchableSelect;