import React, {useState} from 'react';
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import {Button} from "@/components/button/Button.jsx";
import Img from "@/components/utils/Img.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCakeCandles,
    faChartSimple,
    faGlobe,
    faShareFromSquare
} from "@fortawesome/free-solid-svg-icons";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";
import {faInstagram, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";

const AstronautCard = ({id, name, nationality, status, agency, images, social_media, age }) => {
    const [shareOpen, setShareOpen] = useState(false);
    const { handleValue } = useDataFormatter();
    const socialMediaLinks = social_media?.length > 0 ? social_media : [];
    const instagram = socialMediaLinks.find((sm) => sm.name === "Instagram")?.media_url;
    const twitter = socialMediaLinks.find((sm) => sm.name === "Twitter")?.media_url;
    const url = window.location.origin + window.location.pathname + "/" + id;

    return (
        <article className="portrait-card">
            <div className="portrait-card__container">
                <LinkButton to={id.toString()} className="portrait-card__media portrait-card__media--link">
                    <Img
                        src={images?.[0]?.image_url}
                        alt={images?.[0]?.name || "default"}
                        className="portrait-card__image"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </LinkButton>
                <div className="portrait-card__info flex flex-column justify-space-evenly margin-block-4">
                    <div>
                        <LinkButton
                            to={id.toString()}
                            className="landscape-card__title"
                        >
                            <h3 className="fs-small-300">{name}</h3>
                        </LinkButton>
                        <p className="portrait-card__subtitle">{agency? agency.name : "Unknown"}</p>
                    </div>
                    <div className="flex justify-space-around align-center margin-block-2">
                        <div className="portrait-card__detail fs-small-200">
                            <FontAwesomeIcon icon={faGlobe} size="lg"/>
                            <p className="portrait-card__text">
                                {nationality.map(nation => nation?.nationality_name).join(" ")}
                            </p>
                        </div>
                        <div className="portrait-card__detail fs-small-200">
                            <FontAwesomeIcon icon={faChartSimple} size="lg" />
                            <p className="portrait-card__text portrait-card__text--content-break">
                                {status}
                            </p>
                        </div>
                         <div className="portrait-card__detail fs-small-200">
                             <FontAwesomeIcon icon={faCakeCandles} size="lg" />
                             <p className="portrait-card__text fw-bold">
                                {handleValue(age)}
                            </p>
                        </div>

                    </div>
                </div>
                <div className="portrait-card__actions flex flex-wrap justify-center margin-block-4">
                    { instagram ? (
                        <div className="portrait-card__action">
                            <LinkButton
                                className="btn btn--primary"
                                to={instagram}
                                isExternal={true}
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </LinkButton>
                        </div>
                    ) : (
                        <Tooltip content="No Instagram Available">
                            <div className="portrait-card__action">
                                <LinkButton
                                    className="btn btn--primary"
                                    isExternal={true}
                                    disabled={true}
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </LinkButton>
                            </div>
                        </Tooltip>
                    )}
                    { twitter ? (
                        <div className="portrait-card__action">
                            <LinkButton
                                className="btn btn--primary"
                                to={twitter}
                                isExternal={true}
                            >
                                <FontAwesomeIcon icon={faXTwitter} />
                            </LinkButton>
                        </div>
                    ) : (
                        <Tooltip content="No Twitter Available">
                            <div className="portrait-card__action">
                                <LinkButton
                                    className="btn btn--primary"
                                    isExternal={true}
                                    disabled={true}
                                >
                                    <FontAwesomeIcon icon={faXTwitter} />
                                </LinkButton>
                            </div>
                        </Tooltip>
                    )}
                    <div className="portrait-card__action">
                        <Button
                            className="btn btn--primary"
                            onClick={() => setShareOpen(true)}
                        >
                            <FontAwesomeIcon icon={faShareFromSquare} />
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
