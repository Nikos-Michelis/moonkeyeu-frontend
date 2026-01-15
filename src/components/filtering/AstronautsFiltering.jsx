import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {useDebounce} from "@/hooks/util/useDebounce.jsx";
import {useAstronautsFilters} from "@/hooks/paging-filtering/useAstronautsFilters.jsx";
import {Button} from "@/components/button/Button.jsx";
import CustomSelect from "@/components/utils/CustomSelect.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowsRotate, faFilter, faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {useClickOutside} from "@/hooks/util/useClickOutside.jsx";

AstronautsFiltering.propTypes = {
    agency: PropTypes.number,
    status: PropTypes.number,
    nationality: PropTypes.number,
    limit: PropTypes.number,
};

function AstronautsFiltering({ filters, searchPlaceHolder, field, isPending, isFetching, isError }) {
    const [showOptions, setShowOptions] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const optionsRef = useRef(null);
    const triggerRef = useRef(null);
    const limitOptions =
        [
            { id: 12, name: "Limit 12" },
            { id: 24, name: "Limit 24" },
            { id: 50, name: "Limit 50" }
        ];
    const orderingOptions =
        [
            { id: field ? field : "asc", name: "Asc" },
            { id: field ? `-${field}` : "desc", name: "Desc" }
        ]
    const orderingFields =
        [
            { id: "lastFlight", name: "Last Flight Date" },
            { id: "firstFlight", name: "First Flight Date" },
            { id: "age", name: "Age" },
        ];
    const {
        search,
        agency,
        status,
        nationality,
        limit,
        ordering,
        setFilters,
        resetFilters,
    } = useAstronautsFilters();
    const [localSearch, setLocalSearch] = useState(search);
    const debounceSearch = useDebounce(localSearch);

    useEffect(() => {
        setFilters({ search: debounceSearch });
    }, [debounceSearch]);

    const toggleOptions = (isClicked) => {
        setShowOptions((prevState) => prevState !== isClicked);
    };
    const handleReset = () => {
        setSearchValue('');
        setSelectedOption('');
        resetFilters();
        setLocalSearch('');
    };

    const handleClickOutside = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setShowOptions(false);
        }
    };

    useClickOutside({
        modalRef: optionsRef,
        triggerRef: triggerRef,
        handler: handleClickOutside
    });

    return (
        <section className="toolbar">
            <div className="container toolbar__container margin-block-4" data-type="full-bleed">
                <div className="toolbar__tools">
                    <div className="margin-inline-end-2">
                        <Button
                            ref={triggerRef}
                            className="btn btn--primary btn--big fw-bold fs-small-100"
                            onClick={() => toggleOptions(true)}
                            disabled={isFetching || isPending || isError}
                        >
                            Add Filter <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </div>
                    <CustomSelect
                         options={limitOptions || []}
                         field="limit"
                         placeholder={`Limit ${limit}`}
                         setFilters={setFilters}
                         selectedOption={selectedOption}
                         setSelectedOption={setSelectedOption}
                         defaultValue={Number(limit)}
                         isSearchable={false}
                         btnClassName="select__btn select__btn--small"
                         dropDownClassName="select__content--medium"
                    />
                </div>
                <div className="search flex justify-center">
                    <input type="hidden" name="action" value="search" />
                    <input
                        className="search__searchbar"
                        value={localSearch || ""}
                        type="text"
                        name="search"
                        placeholder={searchPlaceHolder}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    <div className="search__btn-search">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                <div ref={optionsRef} className={`toolbar__wrapper height-fade ${ showOptions ? "show md" : ""}`}>
                    <div className="toolbar__options">
                        <div className="toolbar__title"><span>Filter by...</span></div>
                        <div className="toolbar__option">
                            <CustomSelect
                                options={filters?.data?.status || []}
                                field="status"
                                placeholder="Status"
                                setFilters={setFilters}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                defaultValue={Number(status)}
                            />
                        </div>
                        <div className="toolbar__option">
                            <CustomSelect
                                options={filters?.data?.nationalities || []}
                                field="nationality"
                                placeholder={"Νationality"}
                                setFilters={setFilters}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                defaultValue={Number(nationality)}
                            />
                        </div>
                        <div className="toolbar__option">
                            <CustomSelect
                                options={filters?.data?.agencies || []}
                                field="agency"
                                placeholder={"Agency"}
                                setFilters={setFilters}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                defaultValue={Number(agency)}
                            />
                        </div>
                         <div className="toolbar__option">
                             <CustomSelect
                                 options={orderingOptions || []}
                                 field="ordering"
                                 placeholder={selectedOption}
                                 setFilters={setFilters}
                                 selectedOption={selectedOption}
                                 setSelectedOption={setSelectedOption}
                                 defaultValue={ordering}
                                 isSearchable={false}
                             />
                        </div>
                         <div className="toolbar__option">
                             <CustomSelect
                                 options={orderingFields || []}
                                 field="field"
                                 placeholder={"OrderBy"}
                                 setFilters={setFilters}
                                 selectedOption={selectedOption}
                                 setSelectedOption={setSelectedOption}
                                 defaultValue={ordering}
                                 isSearchable={false}
                             />
                        </div>
                    </div>
                    <div className="toolbar__actions">
                        <Button
                            className="btn--transparent fs-small-100"
                            onClick={ handleReset }>
                            <FontAwesomeIcon icon={faArrowsRotate} />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AstronautsFiltering;
