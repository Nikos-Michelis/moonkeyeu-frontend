import {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/util/useDebounce.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch, faXmark} from "@fortawesome/free-solid-svg-icons";
import FilterPopover from "@/components/filtering/FilterPopover.jsx";
import SearchableSelect from "@/components/utils/select/SearchableSelect.jsx";

const MAX_LIMIT = 50;
const LIMIT_OPTIONS = [
    {id: 12, name: "Limit 12"},
    {id: 24, name: "Limit 24"},
    {id: 50, name: "Limit 50"},
];

function FilteringToolbar(
    {
        filters,
        initialSearch,
        onFilterChange,
        onFilterClear,
        onFiltersReset,
        searchPlaceHolder,
        limit,
        status,
        hasFilters = true,
    }) {
    const [localSearch, setLocalSearch] = useState(initialSearch);
    const debounceSearch = useDebounce(localSearch);
    const { isFetching, isPending, isError   } = status ?? {};

    useEffect(() => {
        if (debounceSearch === localSearch) {
            onFilterChange({ search: debounceSearch });
        }
    }, [debounceSearch, localSearch, onFilterChange]);

    const handleReset = () => {
        setLocalSearch('');
        onFiltersReset();
    };

    const onCleanSearch = () => {
        setLocalSearch('');
        onFilterClear("search");
    };

    return (
        <section className="toolbar">
            <div className="container toolbar__container margin-block-4" data-type="full-bleed">
                <div className="toolbar__tools">
                    {hasFilters && (
                        <div className="margin-inline-end-2">
                            <FilterPopover>
                                <FilterPopover.Button
                                    className="btn btn--primary btn--big fw-bold fs-medium-200"
                                    disabled={isFetching || isPending || isError}
                                >
                                    Add Filter <FontAwesomeIcon icon={faPlus} />
                                </FilterPopover.Button>
                                <FilterPopover.Content title="Filter by..." onReset={handleReset}>
                                    {filters.map(({ field, placeholder, options, searchable, value, defaultValue }) => (
                                        <div key={field} className="toolbar__option">
                                            <SearchableSelect
                                                onSelectChange={onFilterChange}
                                                onSelectClear={onFilterClear}
                                                field={field}
                                                placeholder={placeholder}
                                                options={options}
                                                value={value}
                                                defaultValue={defaultValue}
                                                isSearchable={searchable}
                                            />
                                        </div>
                                    ))}
                                </FilterPopover.Content>
                            </FilterPopover>
                        </div>
                    )}
                    <SearchableSelect
                        onSelectChange={onFilterChange}
                        onSelectClear={onFilterClear}
                        field="limit"
                        options={LIMIT_OPTIONS}
                        placeholder={`Limit ${Math.min(limit, MAX_LIMIT)}`}
                        value={limit}
                        defaultValue={Number(LIMIT_OPTIONS[0]?.id)}
                        isSearchable={false}
                        className={{content: "select__content--medium", button: "select__trigger--small"}}
                    />

                    {!hasFilters &&
                       <>
                           {filters.map(({ field, placeholder, options, searchable, value, defaultValue }) => (
                               <div key={field} className="toolbar__option">
                                   <SearchableSelect
                                       onSelectChange={onFilterChange}
                                       onSelectClear={onFilterClear}
                                       field={field}
                                       placeholder={placeholder}
                                       options={options}
                                       value={value}
                                       defaultValue={defaultValue}
                                       isSearchable={searchable}
                                       className={{content: "select__content--medium", button: "select__trigger--small"}}
                                   />
                               </div>
                           ))}
                       </>
                    }
                </div>
                <div className="search">
                    <input type="hidden" name="action" value="search" />
                    <input
                        className="search__searchbar"
                        value={localSearch || ""}
                        type="text"
                        name="search"
                        placeholder={searchPlaceHolder}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                    <div
                        className="search__btn-search"
                        onClick={() => onCleanSearch()}
                    >
                        <FontAwesomeIcon icon={localSearch ? faXmark : faSearch} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FilteringToolbar;