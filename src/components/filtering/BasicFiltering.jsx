import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/util/useDebounce.jsx";
import {useBasicFilters} from "@/hooks/paging-filtering/useBasicFilters.jsx";
import {Button} from "@/components/button/Button.jsx";
import CustomSelect from "@/components/utils/CustomSelect.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

BasicFiltering.propTypes = {
    limit: PropTypes.number,
    search: PropTypes.string,
    ordering: PropTypes.string

};

function BasicFiltering({defaultFilters, searchPlaceHolder, field}) {
    const [selectedOption, setSelectedOption] = useState('');
    const limitOptions =
        [
            {id: 12, name: "Limit 12"},
            {id: 24, name: "Limit 24"},
            {id: 50, name: "Limit 50"}
        ];
    const orderingOptions =
        [
            {id: field ? field : "asc", name: "Asc"},
            {id: field ? `-${field}` : "desc", name: "Desc"}
        ]

    const {
        search,
        limit,
        ordering,
        setFilters,
        resetFilterByName
    } = useBasicFilters(defaultFilters);
    const [locaSearch, setLocalSearch] = useState(search);
    const debounceSearch = useDebounce(locaSearch);

    useEffect(() => {
        setFilters({search: debounceSearch});
    }, [debounceSearch]);

    return (
        <section className="toolbar">
            <div className="container toolbar__container margin-block-4" data-type="full-bleed">
                <div className="toolbar__tools">
                    <CustomSelect
                        options={limitOptions || []}
                        field="limit"
                        placeholder={`Limit ${limit}`}
                        setFilters={setFilters}
                        resetFilterByName={resetFilterByName}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        defaultValue={Number(limit)}
                        isSearchable={false}
                        btnClassName="select__btn select__btn--small"
                        dropDownClassName="select__content--medium"
                    />
                    <CustomSelect
                        options={orderingOptions || []}
                        field="ordering"
                        placeholder={selectedOption}
                        setFilters={setFilters}
                        resetFilterByName={resetFilterByName}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                        defaultValue={ordering}
                        isSearchable={false}
                        btnClassName="select__btn select__btn--small"
                        dropDownClassName="select__content--medium"
                    />
                </div>
                <div className="search flex justify-center">
                    <input type="hidden" name="action" value="search" />
                    <input
                        className="search__searchbar box-shadow-light"
                        value={locaSearch || ""}
                        type="text"
                        name="search"
                        placeholder={searchPlaceHolder}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    <div className="search__btn-search box-shadow-light">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BasicFiltering;