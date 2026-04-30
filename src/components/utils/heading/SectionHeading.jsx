import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { LinkButton } from "@/components/button/LinkButton.jsx";

const SectionHeading = ({ title, url = "#", linkText = null, icon }) => {
    return (
        <div className="section-heading">
            <div className="flex align-center">
                { icon && <FontAwesomeIcon size="2x" icon={icon} style={{marginTop:"10px"}}/> }
                <h1 className=" margin-inline-5 section-heading__title">{title}</h1>
            </div>
            {linkText &&
                <LinkButton to={url} className="section-heading__link">
                    {linkText} <FontAwesomeIcon className="section-heading__arrow" icon={faArrowRight} />
                </LinkButton>}
        </div>
    );
};

export default SectionHeading;