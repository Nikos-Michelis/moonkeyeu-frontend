import PropTypes from "prop-types";
import {useAstronautsFilters} from "@/hooks/paging-filtering/useAstronautsFilters.jsx";
import FilterToolbar from "@/components/filtering/FilterToolbar.jsx";

AstronautsFiltering.propTypes = {
    nationality: PropTypes.number,
    agency: PropTypes.number,
    limit: PropTypes.number,
};

const ORDERING_FIELDS =
    [
        { id: "lastFlight", name: "Last Flight Date" },
        { id: "firstFlight", name: "First Flight Date" },
        { id: "age", name: "Age" },
    ];

function AstronautsFiltering({ filters, searchPlaceHolder, isPending, isFetching, isError }) {
    const {
        search,
        agency,
        status,
        nationality,
        limit,
        ordering,
        field,
        setFilters,
        resetFilters,
        resetFilterByName
    } = useAstronautsFilters();

    const ORDERING_OPTIONS =
        [
            { id: "asc", name: "Asc" },
            { id: "desc", name: "Desc" }
        ]

    const filtersData = filters?.data;

    const filterSections = [
        { field: "status", placeholder: "status", options: filtersData?.status, value: status, searchable: false },
        { field: "nationality", placeholder: "nationality", options: filtersData?.nationalities ?? [], value: nationality  },
        { field: "agency", placeholder: "agency", options: filtersData?.agencies ?? [], value: agency },
        { field: "ordering", placeholder: "SortBy", options: ORDERING_OPTIONS ?? [], value: ordering, defaultValue: 'asc', searchable: false },
        { field: "field", placeholder: "OrderBy", options: ORDERING_FIELDS, value: field, searchable: false },
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
            status={{
                isPending: isPending,
                isFetching: isFetching,
                isError: isError
            }}
       />
    );
}

export default AstronautsFiltering;