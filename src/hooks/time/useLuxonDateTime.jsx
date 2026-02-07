import {DateTime} from "luxon";

const useLuxonDateTime = () => {

    const getNow = () => {
        return DateTime.now();
    }
    
    const getFormattedDateTime = (date, format) => {
        return isDateTimeValid(date) && date.toFormat(format)
    }
    
    const getZonedDateTime = (date) => {
        return isDateTimeValid(date) && getFromISO(date).setZone(DateTime.local().zoneName);
    }

    const getZonedAndFormattedDateTime = (date, format) => {
        const zonedDateTime = isDateTimeValid(date) && getZonedDateTime(date);
        return getFormattedDateTime(zonedDateTime, format);
    }

    const isDateTimeValid = (date) => {
        return getFromISO(date).isValid;
    }

    const getFromISO = (date) => {
        return DateTime.fromISO(date);
    }

    return { getNow, getFormattedDateTime, getZonedDateTime, getZonedAndFormattedDateTime }
}

export default useLuxonDateTime;