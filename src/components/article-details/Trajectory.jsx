import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import PropTypes from "prop-types";

const Trajectory = ({ flightclub_url }) => {
    return(
        <section className="trajectory-section">
            <SectionHeading title="Telemetry" icon={faChartLine}/>
            <div className="article__info-box">
                    <>
                        {flightclub_url ?
                            (
                                <p>View comprehensive details including the rocket’s trajectory, velocity, altitude, thrust, and more at
                                    <a href={flightclub_url} target="_blank" rel="noopener noreferrer">
                                        <span> FlightClub.io</span>
                                    </a>
                                </p>
                            )
                            : <p>Trajectory is not available. Check back for updates.</p>
                        }
                    </>
                </div>
        </section>
    );
};

Trajectory.propTypes = {
    flightclub_url: PropTypes.string.isRequired,
};

export default Trajectory