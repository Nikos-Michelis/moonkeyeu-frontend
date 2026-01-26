import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faExpand} from "@fortawesome/free-solid-svg-icons";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Img from "@/components/utils/Img.jsx";
import React from "react";

const NasaApodArticleContent = ({data}) => {
    return (
        <>
            <div className="container flex justify-start padding-block-start-7 padding-block-end-2">
                <Button
                    className="btn--transparent"
                    onClick={() => window.history.back()}
                >
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                </Button>
            </div>
            <div className="container article__overview flex flex-column justify-center align-center" data-type="full-bleed">
                <div className="article__image-box article__image-box--nasa-apod">
                    <LinkButton to={data?.url} className="btn--transparent hover scale-small pos-absolute right-2 top-2" isExternal={true}>
                        <FontAwesomeIcon icon={faExpand} />
                    </LinkButton>
                    <Img
                        src={data?.url}
                        alt={data?.title || "default"}
                        className="article__image article__image--nasa-apod"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
            </div>
            <div className="article__info-container container flex flex-column" data-type="full-bleed">
                <section className="nasa-description-section">
                    <div className="article__info-box">
                        <h2>{data?.title}</h2>
                        <p>{data?.explanation}</p>
                    </div>
                </section>
                <div className="padding-block-end-4">
                    <hr className="hr-90-md"/>
                </div>
            </div>
        </>
    );
}
export default NasaApodArticleContent;