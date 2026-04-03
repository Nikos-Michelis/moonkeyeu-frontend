import AstronautLandScapeCard from "@/components/cards/AstronautLandScapeCard.jsx";
import {faUserAstronaut} from '@fortawesome/free-solid-svg-icons';
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import PropTypes from "prop-types";

const Crew = ({ crew }) =>{
    const contentConfig = {
        scroll: 2,
        styles: {
            wrapper: "article-card--small-wrapper",
            section: "launches-articles",
            card_type: "landscape-card__container--article-card"
        },
    };
    return(
        <section className="crew-section">
            <SectionHeading title="Crew" icon={faUserAstronaut}/>
            <hr className="hr-100-sm" />
            <div className="flex justify-center align-center padding-block-8">
                <div className="container"
                     data-type="full-width"
                     data-spacing="none"
                     data-scroll={crew.length > contentConfig?.scroll ? "vertical" : undefined}
                >
                    <div className="margin-block-5 margin-inline-4">
                        <div className="grid__layout grid__layout--landscape padding-block-2">
                            {crew.length > 0 &&
                                crew.map(crew =>
                                    <AstronautLandScapeCard
                                        key={crew.id}
                                        styles={contentConfig?.styles}
                                        {...crew}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

Crew.propTypes = {
    crew: PropTypes.array.isRequired,
}

export default Crew;