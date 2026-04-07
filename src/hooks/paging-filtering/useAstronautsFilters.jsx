import { useFilters } from "./useFilters";

const DEFAULT_FILTERS = {
    page: 1,
    limit: 12,
    ordering: 'asc',
};

const parseParams = (params) => ({
    search:      params.get('search'),
    status:      params.get('status')      ? parseInt(params.get('status'))      : undefined,
    nationality: params.get('nationality') ? parseInt(params.get('nationality')) : undefined,
    agency:      params.get('agency')      ? parseInt(params.get('agency'))      : undefined,
    limit:       params.get('limit')       ? parseInt(params.get('limit'))       : DEFAULT_FILTERS.limit,
    ordering:    params.get('ordering')    ?? DEFAULT_FILTERS.ordering,
    field:       params.get('field')    ?? undefined,

});

export function useAstronautsFilters() {
    return useFilters(DEFAULT_FILTERS, parseParams);
}