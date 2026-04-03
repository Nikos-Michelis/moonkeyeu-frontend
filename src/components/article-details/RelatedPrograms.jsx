import ProgramsCard from "@/components/cards/ProgramsCard.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClipboardList, faNewspaper} from "@fortawesome/free-solid-svg-icons";
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";

const RelatedPrograms = ({programs}) =>{
    const contentConfig = {
        scroll: 2,
        styles: {
            wrapper: "article-card--small-wrapper",
            section: "launches-articles",
            card_type: "landscape-card__container--article-card"
        },
    };
    return(
        <section className="program-section">
            <SectionHeading title="Related Programs" icon={faClipboardList}/>
            <div className="flex justify-center align-center padding-block-8">
                <div className="container"
                     data-type="full-width"
                     data-spacing="none"
                     data-scroll={programs.length > contentConfig?.scroll  ? "vertical" : undefined}>
                    <div className="margin-block-5 margin-inline-4">
                        <div className="grid__layout grid__layout--landscape padding-block-2">
                            {programs?.length > 0 && (
                                programs.map((program) => (
                                    <ProgramsCard
                                        key={program.id}
                                        segment={`programs`}
                                        {...program}
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
export default RelatedPrograms;