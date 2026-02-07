import React from 'react';
import {Link} from "react-router-dom";
import Img from "@/components/utils/Img.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuttleSpace } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import useLuxonDateTime from "@/hooks/time/useLuxonDateTime.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";

const NewsArticle = (
    {
        cardStyles,
        soLaunchBtn= true,
        title,
        url,
        image_url,
        news_site,
        published_at,
        launches,
    }) => {

    const { getZonedAndFormattedDateTime } = useLuxonDateTime();
    const formattedZonedDateTime = getZonedAndFormattedDateTime(published_at, 'MMMM dd, yyyy - hh:mm a');

    return (
        <article className={`landscape-card flex justify-center ${cardStyles?.wrapper || "small-wrapper"}`}>
            <div className={`landscape-card__container ${cardStyles?.card_type || ''}`}>
                <div className="landscape-card__media">
                    <Img
                        src={image_url}
                        alt={title || "default"}
                        className="landscape-card__image"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <section className="landscape-card__content flex flex-column justify-space-evenly">
                    <div className="landscape-card__details">
                        <div className="landscape-card__detail-box">
                            <h3 className="title">{news_site}</h3>
                        </div>
                        <div className="landscape-card__detail-box">
                            <small className="fw-semi-bold fs-medium-200 margin-block-2">{formattedZonedDateTime}</small>
                        </div>
                        <div className="landscape-card__detail-box">
                            <p>{title}</p>
                        </div>
                    </div>
                    <hr className="hr-100-sm"/>
                    <div className="landscape-card__actions">
                        <div className="landscape-card__action">
                            <LinkButton className="btn btn--primary" to={url} isExternal={true}>
                                <FontAwesomeIcon icon={faNewspaper} /> Read Article
                            </LinkButton>
                        </div>
                        {soLaunchBtn && launches.length > 0 &&
                            <div className="landscape-card__action">
                                <LinkButton className="btn btn--primary" to={`/launches/${launches[0].launch_id}`}>
                                    <FontAwesomeIcon icon={faShuttleSpace} /> View Launch
                                </LinkButton>
                            </div>
                        }
                    </div>
                </section>
            </div>
        </article>
    );
};

export default NewsArticle;
