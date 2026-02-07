import React, {useState} from 'react';
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import Img from "@/components/utils/Img.jsx";
import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareFromSquare, faShuttleSpace} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";

const RocketCard = (
    {
        id,
        fullname,
        active,
        reusable,
        length,
        diameter,
        max_stage,
        launch_mass,
        leo_capacity,
        gto_capacity,
        to_thrust,
        total_launches,
        maiden_flight,
        image,
        cardStyles
    }) => {
    const [shareOpen, setShareOpen] = useState(false);
    const { handleValue, booleanConverter } = useDataFormatter();
    const tooltipInfoMessage = id ? "" : "No Info Available";
    const launchUrl = `launches?page=1&limit=12&launcher=${id.toString()}&upcoming=all`;
    const url = `${window.location.origin}/${launchUrl}` || `${window.location.origin}/${window.location.pathname}/${id}`;

    return (
        <article className={`landscape-card flex justify-center ${cardStyles?.wrapper || 'medium-wrapper'}`}>
            <div className={`landscape-card__container ${cardStyles?.card_type || ''}`}>
                <div className="landscape-card__media">
                    <Img
                        src={image?.image_url}
                        alt={image?.name || "default"}
                        className="landscape-card__image"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <section className="landscape-card__content flex flex-column justify-space-evenly">
                    <div className="panel">
                        <h4 className="panel__title">{fullname}</h4>
                        <hr/>
                        <div className="panel__wrapper">
                            <div className="panel__container">
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Active</p>
                                    <p className="panel__text">{handleValue(booleanConverter(active))}</p>
                                </div>
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Reusable</p>
                                    <p className="panel__text">{handleValue(booleanConverter(reusable))}</p>
                                </div>
                            </div>
                            <div className="panel__container">
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Height</p>
                                    <p className="panel__text">{handleValue(length, "Meters")}</p>
                                </div>
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Diameter</p>
                                    <p className="panel__text">{handleValue(diameter, "Meters")}</p>
                                </div>
                            </div>
                            <div className="panel__container">
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Max Stages</p>
                                    <p className="panel__text">{handleValue(max_stage)}</p>
                                </div>
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text"></p>
                                    <p className="panel__text"></p>
                                </div>
                            </div>
                            <hr/>
                            <div className="panel__container">
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Liftoff Thrust</p>
                                    <p className="panel__text">{handleValue(to_thrust, "Tonnes")}</p>
                                </div>
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Mass To LEO</p>
                                    <p className="panel__text">{handleValue(leo_capacity, "kg")}</p>
                                </div>
                            </div>
                             <div className="panel__container">
                                 <div className="panel__detail-box fs-medium-200 padding-1">
                                     <p className="panel__text">Liftoff Mass</p>
                                     <p className="panel__text">{handleValue(launch_mass, "Tonnes")}</p>
                                 </div>
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Mass To GTO</p>
                                    <p className="panel__text">{handleValue(gto_capacity, "kg")}</p>
                                </div>
                            </div>
                            <div className="panel__container">
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Maiden Flight</p>
                                    <p className="panel__text">{handleValue(maiden_flight)}</p>
                                </div>
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Total Launches</p>
                                    <p className="panel__text">{handleValue(total_launches)}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="landscape-card__actions">
                        {id ? (
                            <div className="landscape-card__action">
                                <LinkButton className="btn btn--primary" to={`/launches?page=1&limit=12&rocketConfig=${id.toString()}&upcoming=all`}>
                                    <FontAwesomeIcon icon={faShuttleSpace} /> View Launch
                                </LinkButton>
                            </div>
                        ) : (
                            <Tooltip content={tooltipInfoMessage}>
                                <div className="landscape-card__action">
                                    <LinkButton className="btn btn--primary">
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
