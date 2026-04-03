import {useCountDown} from "@/hooks/time/useCountDown.jsx";
import PropTypes from "prop-types";

const CountdownTimer = (
    {
        net,
        styles = {},
        classNames = {},
        labels = true,
        showMonths = true,
        showsDays = true
    }) => {
    const targetTimeInMillis = new Date(net).getTime();

    const  { months, days, hours, minutes, seconds }
        = useCountDown(targetTimeInMillis, 1000);

    const padZero = (number) => {
        return (number < 10 ? "0" : "") + number;
    }
    return (
        <div className={`counter ${classNames.content}`} style={{...styles.content }} data-end-date={targetTimeInMillis}>
            <div className="flex justify-center">
                <div className="counter__digit-box">
                    <div className={`counter__number ${classNames.number}`}><span className="margin-inline-end-1">T-</span></div>
                </div>
                { showMonths &&
                    <>
                        <div className="counter__digit-box">
                            <div className={`counter__number ${classNames.number}`}><span>{padZero(months)}</span></div>
                            { labels && <div className="counter__label"><label>MTH</label></div> }
                        </div>
                        <div className="counter__digit-box">
                            <div className={`counter__number ${classNames.number}`}><span className="margin-inline-1">:</span></div>
                        </div>
                    </>
                }
                { showsDays &&
                    <>
                        <div className="counter__digit-box">
                            <div className={`counter__number ${classNames.number}`}><span>{padZero(days)}</span></div>
                            { labels && <div className="counter__label"><label>DAY</label></div> }
                        </div>
                        <div className="counter__digit-box">
                            <div className={`counter__number ${classNames.number}`}><span className="margin-inline-1">:</span></div>
                        </div>
                    </>
                }
                <div className="counter__digit-box">
                    <div className={`counter__number ${classNames.number}`}><span>{padZero(hours)}</span></div>
                    { labels && <div className="counter__label"><label>HR</label></div> }
                </div>
                <div className="counter__digit-box">
                    <div className={`counter__number ${classNames.number}`}><span className="margin-inline-1">:</span></div>
                </div>
                <div className="counter__digit-box">
                    <div className={`counter__number ${classNames.number}`}><span>{padZero(minutes)}</span></div>
                    { labels && <div className="counter__label"><label>MIN</label></div> }
                </div>
                <div className="counter__digit-box">
                    <div className={`counter__number ${classNames.number}`}><span className="margin-inline-1">:</span></div>
                </div>
                <div className="counter__digit-box">
                    <div className={`counter__number ${classNames.number}`}><span>{padZero(seconds)}</span></div>
                    { labels && <div className="counter__label"><label>SEC</label></div> }
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;

CountdownTimer.prototype =  {
    net: PropTypes.object.isRequired,
    classNames: PropTypes.object,
    styles: PropTypes.object,
    labels: PropTypes.bool,
    showMonths: PropTypes.bool,
    showDays: PropTypes.bool
}

CountdownTimer.defaultType = {
    classNames: {},
    styles: {},
    labels: true,
    showMonths: true,
    showDays: true
}