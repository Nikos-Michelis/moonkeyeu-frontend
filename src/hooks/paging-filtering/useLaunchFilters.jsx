import { useFilters } from "./useFilters";

const DEFAULT_FILTERS = {
    page: 1,
    limit: 12,
    upcoming: 'true',
};

const parseParams = (params) => ({
    search:          params.get('search'),
    location:        params.get('location')        ? parseInt(params.get('location'))        : undefined,
    launcher:        params.get('launcher'),
    agency:          params.get('agency')          ? parseInt(params.get('agency'))          : undefined,
    upcoming:        params.get('upcoming') !== 'all' ? params.get('upcoming')               : DEFAULT_FILTERS.upcoming,
    rocketConfig:    params.get('rocketConfig')    ? parseInt(params.get('rocketConfig'))    : undefined,
    spacecraftConfig:params.get('spacecraftConfig')? parseInt(params.get('spacecraftConfig')): undefined,
    astronaut:       params.get('astronaut')       ? parseInt(params.get('astronaut'))       : undefined,
    limit:           params.get('limit')           ? parseInt(params.get('limit'))           : DEFAULT_FILTERS.limit,
    ordering:        params.get('ordering')        ?? DEFAULT_FILTERS.ordering,
});


export function useLaunchFilters() {
    return useFilters(DEFAULT_FILTERS, parseParams);
}