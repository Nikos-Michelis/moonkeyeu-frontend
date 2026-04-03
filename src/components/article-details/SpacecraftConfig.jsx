import SpacecraftCard from "@/components/cards/SpacecraftCard.jsx";
import {faGear} from '@fortawesome/free-solid-svg-icons';
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";

const SpacecraftConfig = ({ spacecraftConfigs }) =>{
    const contentConfig = {
        scroll: 2,
        styles: {
            wrapper: "article-card--medium-wrapper",
            card_type: "landscape-card__container--article-card"
        },
    };
    return(
        <section className="spacecrfat-section">
            <SectionHeading title="Spacecraft Configs" icon={faGear}/>
            <div className="flex justify-center align-center padding-block-8">
                <div className="container"
                     data-spacing="none"
                     data-type="full-width"
                     data-scroll={spacecraftConfigs.length > contentConfig?.scroll  ? "vertical" : undefined}>
                    <div className="margin-block-5 margin-inline-4">
                        <div className="grid__layout grid__layout--landscape padding-block-2">
                            {spacecraftConfigs?.length > 0 && (
                                spacecraftConfigs.map((config) => (
                                    <SpacecraftCard
                                        showPanel={true}
                                        navUrl={`/launches?page=1&limit=12&spacecraftConfig=${config?.id.toString()}&upcoming=all`}
                                        key={config.id}
                                        {...config}
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
export default SpacecraftConfig;