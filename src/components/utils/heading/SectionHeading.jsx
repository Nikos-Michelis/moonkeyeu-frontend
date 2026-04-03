import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faGear} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {LinkButton} from "@/components/button/LinkButton.jsx";

const SectionHeading = ({ title, highlight, url = "#", linkText = null, icon }) => {
    return (
        <section className="section-heading">
            <div className="flex align-center">
                { icon && <FontAwesomeIcon size="2x" icon={icon} style={{marginTop:"10px"}}/> } <h1 className=" margin-inline-5 section-heading__title">{title}</h1>
            </div>
            {linkText &&
                <LinkButton to={url} className="section-heading__link">
                    {linkText} <FontAwesomeIcon className="section-heading__arrow" icon={faArrowRight} />
                </LinkButton>}
        </section>
    )
}
export default SectionHeading;