import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import {Button} from "@/components/button/Button.jsx";
import Img from "@/components/utils/Img.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faShareFromSquare} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";

const ProgramsCard = (
    {
        segment,
        id,
        name,
        wiki_url,
        description,
        start_date,
        type,
        images,
        cardStyles
    }) => {
    const [shareOpen, setShareOpen] = useState(false);
    const tooltipInfoMessage = id ? "" : "No Info Available";
    const url =  segment ? `${window.location.origin}/${segment}/${id}` : `${window.location.origin}/${window.location.pathname}/${id}`;

    return (
        <article className={`landscape-card flex justify-center ${cardStyles?.wrapper || 'small-wrapper'}`}>
            <div className={`landscape-card__container ${cardStyles?.card_type || ''}`}>
                <div className="landscape-card__media">
                    <Img
                        src={images?.[0]?.image_url}
                        alt={images?.[0]?.name || "default"}
                        className="landscape-card__image landscape-card__image--scale-down"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <section className="landscape-card__content flex flex-column justify-space-between">
                    <div className="landscape-card__details">
                        <div className="landscape-card__detail-box">
                            <h3 className="title">{name}</h3>
                        </div>
                        <div className="flex justify-space-between">
                            <div className="landscape-card__detail-box">
                                <small className="fw-semi-bold fs-medium-200">{type}</small>
                            </div>
                            <div className="landscape-card__detail-box">
                                <small className="fw-semi-bold fs-medium-200">{start_date}</small>
                            </div>
                        </div>
                    </div>
                    <div className="landscape-card__detail-box landscape-card--ellipsis">
                        <p>{description}</p>
                    </div>
                    <hr className="hr-100-sm"/>
                    <div className="landscape-card__actions padding-block-start-2 padding-block-end-6">
                        {id ? (
                            <div className="launch-card__action">
                                <Link className="btn btn--primary" to={segment ? `/${segment}/${id.toString()}` : id.toString()} >
                                    <FontAwesomeIcon icon={faCircleInfo} /> INFO
                                </Link>
                            </div>
                        ) : (
                            <Tooltip content={tooltipInfoMessage}>
                                <div className="launch-card__action">
                                    <Link className="btn btn--primary" to="#" >
                                        <FontAwesomeIcon icon={faCircleInfo} /> INFO
                                    </Link>
                                </div>
                            </Tooltip>
                        )}
                        <div className="portrait-card__action">
                            <Button
                                className="btn btn--primary"
                                onClick={() => setShareOpen(true)}
                            >
                                <FontAwesomeIcon icon={faShareFromSquare} /> SHARE
                            </Button>
                        </div>
                        <Modal open={shareOpen} onOpenChange={setShareOpen}>
                            <Modal.Content title="Share">
                                <ShareContent url={url} title={name} />
                            </Modal.Content>
                        </Modal>
                    </div>
                </section>
            </div>
        </article>
    );
};

export default ProgramsCard;
