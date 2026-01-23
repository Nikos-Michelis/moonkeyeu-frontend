import React from 'react';
import {LinkButton} from "@/components/button/LinkButton.jsx";

export const VehicleOptionCard = ({ disable, title, description, linkText, sectionImage, link }) => {
    return (
        <>
            <article className="portrait-card portrait-card--vehicle">
                    <div className="portrait-card__container portrait-card__container--vehicle flex flex-column justify-center" >
                        <div style={{backgroundImage: `url(${sectionImage})`}}>
                            <h1>{title}</h1>
                            <p>{description}</p>
                            <div className="flex flex-wrap justify-center margin-block-4">
                                <LinkButton className="btn btn--primary" to={link} disabled={disable}>{linkText} </LinkButton>
                            </div>
                        </div>
                    </div>
            </article>
        </>

    );
};
