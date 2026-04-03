import {faChartLine} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";

const WeatherConcerns = ({ weather_concerns }) => {
    return(
        <section className="trajectory-section">
            <SectionHeading title="Weather" icon={faChartLine}/>
            <hr className="hr-100-sm" />
            <div className="flex flex-column">
                <div className="article__info-box">
                    <>
                        {weather_concerns !== null ?

                            <p>{weather_concerns}</p>
                            :
                            <p>Weather concerns is not available. Check back for updates.</p>
                        }
                    </>
                </div>
                <div className="flex justify-end margin-block-start-4">
                    <small>Weather data powered by <a href="https://openweathermap.org/" target="_blank">OpenWeather</a></small>
                </div>
            </div>
        </section>
    );
};
export default WeatherConcerns