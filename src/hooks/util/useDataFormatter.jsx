import {useCallback} from "react";

const useDataFormatter = () => {

    const handleValue = useCallback((value, metric = "") => {
        return value !== null ? `${value} ${metric}` : "―";
    }, []);

    const booleanConverter = useCallback((value) => {
        if (value === null) return null;
        return value === true ? "Yes" : "No";
    }, []);

    const handleNumberLocale = useCallback((value, locale= "en-US") => {
        if (value !== null && !isNaN(value)) {
            return new Intl.NumberFormat(locale).format(value)
        }
    }, []);

    return { handleValue, booleanConverter, handleNumberLocale };
};

export default useDataFormatter;
