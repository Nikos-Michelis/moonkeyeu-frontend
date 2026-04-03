import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import AgencyCard from "@/components/cards/AgencyCard.jsx";
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import PropTypes from "prop-types";

const Agencies = ({ agencies }) =>{
    const contentConfig = {
        styles: {
            wrapper: "article-card--small-wrapper",
            section: "launches-articles",
            card_type: "landscape-card__container--article-card"
        },
    };
    return(
        <section className="agency-section">
            <SectionHeading title="Related Agencies" icon={faBuilding}/>
            <div className="flex justify-center align-center padding-block-8">
                <div className="container"
                     data-type="full-width"
                     data-spacing="none"
                     data-scroll={agencies.length > 2 ? "vertical" : undefined}
                >
                    <div className="margin-block-5 margin-inline-4">
                        <div className="grid__layout grid__layout--landscape padding-block-2">
                            {agencies?.length > 0 && (
                                agencies.map((agency) => (
                                    <AgencyCard
                                        key={agency.id}
                                        {...agency}
                                        cardStyles={contentConfig?.styles}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

Agencies.propTypes = {
    agencies: PropTypes.array.isRequired,
}
export default Agencies;