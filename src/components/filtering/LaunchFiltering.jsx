import PropTypes from "prop-types";
import {useLaunchFilters} from "@/hooks/paging-filtering/useLaunchFilters.jsx";
import FilterToolbar from "@/components/filtering/FilterToolbar.jsx";

LaunchFiltering.propTypes = {
    location: PropTypes.number,
    launcher: PropTypes.number,
    agency: PropTypes.number,
    upcoming: PropTypes.bool,
    rocketConfig: PropTypes.number,
    spacecraftConf: PropTypes.number,
    astronaut: PropTypes.number,
    search: PropTypes.string,
    limit: PropTypes.number,
};

const SCHEDULED_OPTIONS =
    [
        { id: "true", name: "Upcoming" },
        { id: "false", name: "Previous" }
    ];

const ORDERING_OPTIONS  =
    [
        { id: "asc", name: "Asc" },
        { id: "desc", name: "Desc" }
    ];

function LaunchFiltering({filters, searchPlaceHolder, isPending, isFetching, isError }) {
    const {
        search,
        location,
        launcher,
        agency,
        upcoming,
        rocketConfig,
        spacecraftConfig,
        astronaut,
        limit,
        ordering,
        setFilters,
        resetFilters,
        resetFilterByName
    } = useLaunchFilters();

    const filtersData = filters?.data;
    const filterSections = [
        { field: "upcoming", placeholder: "Upcoming/Past", options: SCHEDULED_OPTIONS, value: upcoming, defaultValue: true , searchable: false },
        { field: "location", placeholder: "Location", options: filtersData?.locations ?? [], value: location  },
        { field: "launcher", placeholder: "Launcher", options: filtersData?.launchers ?? [], value: launcher },
        { field: "agency", placeholder: "Agency", options: filtersData?.agencies ?? [], value: agency },
        { field: "rocketConfig", placeholder: "Rocket", options: filtersData?.rocket_configurations ?? [], value: rocketConfig },
        { field: "spacecraftConfig", placeholder: "Spacecraft", options: filtersData?.spacecraft_configurations ?? [], value: spacecraftConfig },
        { field: "astronaut", placeholder: "Astronaut", options: filtersData?.astronauts ?? [], value: astronaut },
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

export default LaunchFiltering;
