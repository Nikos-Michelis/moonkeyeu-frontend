import React from "react";
import useComparator from "@/hooks/util/useComparator.jsx";
import Img from "@/components/utils/Img.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimeline} from '@fortawesome/free-solid-svg-icons';
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";

const Mission = ({mission, launchCost, missionPatches}) => {
    const {handleNumberLocale} = useDataFormatter();
    const missionPatch = useComparator(missionPatches, (a, b) => a.priority > b.priority);
    const formattedNumber = handleNumberLocale(Number(launchCost));
    return(
        <section className="mission-section">
            <div className="article__heading-box">
                <FontAwesomeIcon icon={faTimeline} />
                <h2>Mission</h2>
            </div>
            <hr className="hr-100-sm" />
            <div className="container flex flex-wrap justify-center align-center padding-block-8" data-type="full-bleed" data-spacing="none">
                <div className="article__info-box article__info-box--col">
                    <h3>{mission.name}</h3>
                    <ul className="article__list">
                        <li><span>Type: </span>{mission.type}</li>
                        <li><span>Orbit: </span>{mission.orbit}</li>
                        <li><span>Launch Cost: </span>{launchCost > 0 ? formattedNumber : "Unknown"}</li>
                    </ul>
                    <p>{mission.description}</p>
               </div>
                <div className="article__img-box margin-block-start-5">
                   <Img
                       src={missionPatch?.image_url}
                       alt={missionPatch?.name || "default"}
                       className="article__img article__img--small"
                       defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo-transparent.svg`}
                   />
               </div>
           </div>
        </section>
    );
}
export default Mission;