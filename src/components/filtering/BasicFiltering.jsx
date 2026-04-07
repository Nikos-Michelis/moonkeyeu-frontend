import PropTypes from "prop-types";
import {useBasicFilters} from "@/hooks/paging-filtering/useBasicFilters.jsx";
import FilterToolbar from "@/components/filtering/FilterToolbar.jsx";
BasicFiltering.propTypes = {
    limit: PropTypes.number,
    search: PropTypes.string,
    ordering: PropTypes.string
};

function BasicFiltering({ defaultFilters, searchPlaceHolder, field }) {
    const {
        search,
        limit,
        ordering,
        setFilters,
        resetFilters,
        resetFilterByName
    } = useBasicFilters(defaultFilters);

    const ORDERING_OPTIONS = [
        { id: field ? field : "asc", name: "Asc" },
        { id: field ? `-${field}` : "desc", name: "Desc" }
    ];

    const filterSections = [
        { field: "ordering", placeholder: "Ordering", options: ORDERING_OPTIONS, value: ordering, defaultValue: defaultFilters?.ordering , searchable: false },
    ];

    return (
       <FilterToolbar
            filters={filterSections}
            initialSearch={search}
            onFilterChange={setFilters}
            onFilterClear={resetFilterByName}
            onFiltersReset={resetFilters}
            searchPlaceHolder={searchPlaceHolder}
            limit={limit}
            hasFilters={false}
       />
    );
}

export default BasicFiltering;