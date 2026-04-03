import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import LaunchCard from "@/components/cards/LaunchCard.jsx";
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";

const UpcomingLaunch = ({launch}) => {
    const contentConfig = {
        styles: {
            wrapper: "article-card--large-wrapper",
            card_type: "landscape-card__container--article-card"
        },
    };
    return (
        <section className="upcoming-launch-section">
            <SectionHeading title="Upcoming Launch" icon={faStopwatch}/>
            <div className="container" data-spacing="none" data-type="full-width">
                <div className="margin-block-8 margin-inline-4">
                    <LaunchCard
                        key={launch?.id}
                        {...(launch)}
                        navUrl={'/launches'}
                        cardStyles={contentConfig?.styles}
                    />
                </div>
            </div>
        </section>
    );
}
export default UpcomingLaunch;