import BoosterInfo from "@/components/article-details/BoosterInfo.jsx";
import {faBolt} from '@fortawesome/free-solid-svg-icons';
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import PropTypes from "prop-types";

const Boosters = ({ stage }) =>{
    return(
        <section className="agency-section">
            <SectionHeading title="Booster" icon={faBolt}/>
            {stage.length > 0 &&
                stage.map(stage => (
                   <BoosterInfo key={stage.id} {...stage}></BoosterInfo>
                ))}
        </section>
    )
}

Boosters.propTypes = {
    stage: PropTypes.array.isRequired,
}

export default Boosters;