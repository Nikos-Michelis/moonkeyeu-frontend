import React, {useState} from 'react';
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import {Button} from "@/components/button/Button.jsx";
import Img from "@/components/utils/Img.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faShareFromSquare} from "@fortawesome/free-solid-svg-icons";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";

const AstronautCard = ({id, name, nationality, agency, images }) => {
    const [shareOpen, setShareOpen] = useState(false);
    const tooltipInfoMessage = id ? "" : "No Info Available";
    const url = window.location.origin + window.location.pathname + "/" + id;

    return (
        <article className="portrait-card">
            <div className="portrait-card__container">
                <div className="portrait-card__media">
                    <Img
                        src={images?.[0]?.image_url}
                        alt={images?.[0]?.name || "default"}
                        className="portrait-card__image"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <div className="portrait-card__info flex flex-column justify-space-evenly margin-block-start-1 margin-inline-2">
                    <h2 className="portrait-card__title">{name}</h2>
                    <p className="portrait-card__text">
                        {nationality.map(nation => nation?.nationality_name).join(" / ")}
                    </p>
                    <p className="portrait-card__text">{agency? agency.name : "Unknown"}</p>
                </div>
                <hr className="hr-100-sm"/>
                <div className="portrait-card__actions flex flex-wrap justify-center margin-block-4">
                    {id ? (
                        <div className="portrait-card__action">
                            <LinkButton className="portrait-card__button btn btn--primary" to={id.toString()}>
                                <FontAwesomeIcon icon={faCircleInfo} /> INFO
                            </LinkButton>
                        </div>
                    ) : (
                        <Tooltip content={tooltipInfoMessage}>
                            <div className="portrait-card__action">
                                <LinkButton className="portrait-card__button btn btn0-primary">
                                    <FontAwesomeIcon icon={faCircleInfo} /> INFO
                                </LinkButton>
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
            </div>
        </article>
    );
};

export default AstronautCard;
