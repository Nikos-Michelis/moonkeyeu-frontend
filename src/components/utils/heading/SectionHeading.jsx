import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import PropTypes from "prop-types";

const SectionHeading = ({ title, url = null, linkText = null, icon = null }) => {
    return (
        <section className="section-heading">
            <div className="section-heading__wrapper">
                { icon && <FontAwesomeIcon size="2x" icon={icon} style={{marginTop:"10px"}}/> } <h1 className=" margin-inline-5 section-heading__title">{title}</h1>
            </div>
            {linkText &&
                <LinkButton to={url} className="section-heading__link">
                    {linkText} <FontAwesomeIcon className="section-heading__arrow" icon={faArrowRight} />
                </LinkButton>
            }
        </section>
    )
}
export default SectionHeading;

SectionHeading.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    linkText: PropTypes.string,
    icon: PropTypes.object,
}

SectionHeading.defaultTypes = {
    url: null,
    linkText: null,
    icon: null,
}
