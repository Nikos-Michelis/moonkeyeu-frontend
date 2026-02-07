import React from "react";
import Img from "@/components/utils/Img.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";

const NewsAsideArticle = ({imageSrc, title, author, date, url, isExternalUrl}) => {
    return (
        <article className="portrait-card margin-block-4">
            <div className="portrait-card__container portrait-card__container--small flex flex-column">
                <LinkButton to={url} className="portrait-card__image-link" isExternal={isExternalUrl}>
                    <Img
                        src={imageSrc}
                        alt={title || "default"}
                        className={`portrait-card__image portrait-card__image--sidebar`}
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </LinkButton>
                <div className="padding-block-start-3 padding-block-end-2 padding-inline-1">
                    <p className="fs-medium-200 text-center fw-regular">{title}</p>
                </div>
                <div className="flex justify-space-between align-center padding-block-start-6 padding-block-end-2 padding-inline-2">
                    <div>
                        <p className="fs-small-100 text-start fw-regular">{date}</p>
                    </div>
                    <div>
                        <p className="fs-medium-200 text-end fw-regular">{author}</p>
                    </div>
                </div>

            </div>
        </article>
    );
};

export default NewsAsideArticle;
