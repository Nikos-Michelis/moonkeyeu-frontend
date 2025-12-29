import React, {useState, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faAngleUp, faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';
import {useClickOutside} from "@/hooks/util/useClickOutside.jsx";
import Tooltip from "@/components/tooltip/Tooltip.jsx";

const CustomSelect = (
    {
        options = [],
        setFilters,
        resetFilterByName,
        placeholder,
        field,
        searchValue,
        selectedOption,
        setSelectedOption,
        setSearchValue,
        defaultValue,
        isSearchable = true,
        btnClassName = "",
        dropDownClassName = "",

    }) => {
    const OPTIONS_LENGTH = 15;
    const SELECTED_LENGTH = 18;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const preSelected = options?.find?.((item) => item.id === defaultValue)?.name || null;
    const handleOnSelect = (value) => {
        if (!value) return;
        setFilters({[field]: value.id });
        setSelectedOption((prev) => ({ ...prev, [field]: value.name }));
        setIsOpen(false);
    };

    const handleOnSearch = (e) => {
        setSearchValue((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchValue?.[field]?.toLowerCase() || "")
    );

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useClickOutside({ modalRef: dropdownRef, handler: handleClickOutside });
    const handleClearance = (field) => {
        setSelectedOption(prev => ({...prev, [field]: ""}));
        resetFilterByName(field);
    };
    const btnPlaceholder = selectedOption?.[field] || preSelected || placeholder;
    return (
        <div className="select" ref={dropdownRef}>
            <div className={`select__btn ${btnClassName}`} onClick={() => selectedOption?.[field] && !isOpen ? handleClearance(field) : setIsOpen(!isOpen)}>
                {
                    btnPlaceholder.length > OPTIONS_LENGTH
                        ?
                        <Tooltip message={btnPlaceholder}>
                            <div className="select__btn--ellipsis">
                                {btnPlaceholder}
                            </div>
                        </Tooltip>
                        :
                        <div>{selectedOption?.[field] || preSelected || placeholder}</div>
                }

                <FontAwesomeIcon icon={selectedOption?.[field] ? faXmark : isOpen ? faAngleUp : faAngleDown} />
            </div>
            {isOpen && (
                <div className={`select__content ${dropDownClassName}`}>
                    {isSearchable && (
                        <div className="select__search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchValue?.[field] || ""}
                                onChange={handleOnSearch}
                            />
                        </div>
                    )}
                    <ul className="select__options">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li className={`${defaultValue === option.id? "selected" : ""}`} key={option.id} onClick={() => handleOnSelect(option)}>
                                    { option?.name.length > SELECTED_LENGTH
                                        ?
                                        <Tooltip message={option.name}>
                                            <div className="select__options--ellipsis">{option.name}</div>
                                        </Tooltip>
                                        : <div>{option.name}</div>
                                    }
                                </li>
                            ))
                        ) : (
                            <li>No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
