import React, {useState} from 'react';
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import {Button} from "@/components/button/Button.jsx";
import Img from "@/components/utils/Img.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareFromSquare, faShuttleSpace} from "@fortawesome/free-solid-svg-icons";
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";

const RocketCard = (
    {
        id,
        details,
        flight_proven,
        serial_number,
        successful_landings,
        attempted_landings,
        flights,
        status,
        images,
        cardStyles
    }) => {
    const [shareOpen, setShareOpen] = useState(false);
    const { handleValue, booleanConverter } = useDataFormatter();
    const tooltipInfoMessage = id ? "" : "No Info Available";
    const launchUrl = `launches?page=1&limit=12&launcher=${id.toString()}&upcoming=all`;
    const url = `${window.location.origin}/${launchUrl}` || `${window.location.origin}/${window.location.pathname}/${id}`;

    return (
        <article className={`landscape-card flex justify-center ${cardStyles?.wrapper || 'medium-wrapper'}`}>
            <div className="landscape-card__container">
                    <div className="landscape-card__media">
                        <Img
                            src={images?.[0]?.image_url}
                            alt={images?.[0]?.name || "default"}
                            className="landscape-card__image"
                            defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                        />
                    </div>
                    <section className="landscape-card__content flex flex-column justify-space-evenly">
                        <div className="panel">
                            <h4 className="panel__title">{handleValue(serial_number)}</h4>
                            <hr/>
                            <div className="panel__wrapper">
                                <div className="panel__container">
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Status</p>
                                        <p className="panel__text">{handleValue(status)}</p>
                                    </div>
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text"></p>
                                        <p className="panel__text"></p>
                                    </div>
                                </div>
                                <div className="panel__container">
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">flights</p>
                                        <p className="panel__text">{handleValue(flights)}</p>
                                    </div>
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Flight Proven</p>
                                        <p className="panel__text">{handleValue(booleanConverter(flight_proven))}</p>
                                    </div>
                                </div>
                                <div className="panel__container">
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Successful Landings</p>
                                        <p className="panel__text">{handleValue(successful_landings)}</p>
                                    </div>
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Attempted Landings</p>
                                        <p className="panel__text">{handleValue(attempted_landings)}</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="panel__container">
                                    <div className="panel__detail-box fs-medium-200">
                                        <p className="panel__text padding-block-2">{details}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="landscape-card__actions flex flex-wrap justify-center padding-block-2">
                            {id ? (
                                <div className="landscape-card__info">
                                    <LinkButton className="btn btn--primary" to={`/launches?page=1&limit=12&launcher=${id.toString()}&upcoming=all`} >
                                        <FontAwesomeIcon icon={faShuttleSpace} /> View Launch
                                    </LinkButton>
                                </div>
                            ) : (
                                <Tooltip content={tooltipInfoMessage}>
                                    <div className="landscape-card__info">
                                        <LinkButton className="btn btn--primary" >
                                            <FontAwesomeIcon icon={faShuttleSpace} /> View Launch
                                        </LinkButton>
                                    </div>
                                </Tooltip>
                            )}
                            <div className="landscape-card__action">
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

export default RocketCard;
