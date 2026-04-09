import { useFilters } from "./useFilters";

const DEFAULT_FILTERS = {
    page: 1,
    limit: 12,
    offset: 0,
    ordering: 'asc',
};

const parseParams = (params) => ({
    search:   params.get('search'),
    limit:    params.get('limit')   ? parseInt(params.get('limit'))   : DEFAULT_FILTERS.limit,
    ordering: params.get('ordering') ?? DEFAULT_FILTERS.ordering,
});

export function useBasicFilters(defaultFilters) {
    return useFilters(defaultFilters, parseParams);
}