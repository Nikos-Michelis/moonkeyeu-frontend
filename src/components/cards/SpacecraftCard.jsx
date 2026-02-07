import React, {useState} from 'react';
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import {Button} from "@/components/button/Button.jsx";
import Img from "@/components/utils/Img.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faShareFromSquare,
    faShuttleSpace
} from '@fortawesome/free-solid-svg-icons';

import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";
import useLuxonDateTime from "@/hooks/time/useLuxonDateTime.jsx";

const SpacecraftCard = (
    {
        showPanel = false,
        navUrl,
        id,
        name,
        in_use,
        length,
        diameter,
        agency,
        maiden_flight,
        capability,
        history,
        human_rated,
        images,
        wiki_url,
        cardStyles
    }) => {
    const [shareOpen, setShareOpen] = useState(false);
    const { handleValue, booleanConverter } = useDataFormatter();
    const { getZonedAndFormattedDateTime } = useLuxonDateTime();
    const formattedZonedDateTime = getZonedAndFormattedDateTime(maiden_flight, 'MMMM dd, yyyy');
    const spacecraftUrl = `/vehicles/spacecraft/${id}`;
    const url = navUrl ? window.location.origin + spacecraftUrl : window.location.origin + window.location.pathname + "/" + id;

    return (
        <article className={`landscape-card flex justify-center ${cardStyles?.wrapper || 'medium-wrapper'}`}>
            <div className={`landscape-card__container ${cardStyles?.card_type || ''}`}>
                <div className="landscape-card__media">
                    <Img
                        src={images?.[0]?.image_url}
                        alt={images?.[0]?.name || "default"}
                        className="landscape-card__image"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <section className="landscape-card__content flex flex-column justify-space-evenly">
                    {!showPanel &&
                        <>
                            <div className="landscape-card__details">
                                <div className="landscape-card__detail-box">
                                    <h3 className="title">{name}</h3>
                                </div>
                                {maiden_flight &&
                                    <div className="flex justify-space-between flex-wrap margin-block-2">
                                        <div>
                                            <small>{agency?.name}</small>
                                        </div>
                                        <div>
                                            <small>{formattedZonedDateTime}</small>
                                        </div>
                                    </div>
                                }
                                <div className="landscape-card__detail-box landscape-card--ellipsis">
                                    <p className="capability">{capability.endsWith('.') ? capability : capability + '.'} {history}</p>
                                </div>
                                <hr className="hr-100-sm"/>
                            </div>
                        </>
                    }

                    {showPanel &&
                        <div className="panel">
                            <h4 className="panel-body__title">{name}</h4>
                            <hr/>
                            <div className="panel__wrapper">
                                <div className="panel__container">
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Active</p>
                                        <p className="panel__text">{handleValue(booleanConverter(in_use))}</p>
                                    </div>
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Human Rated</p>
                                        <p className="panel__text">{handleValue(booleanConverter(human_rated))}</p>
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
                                        <p className="panel__text">Maiden Flight</p>
                                        <p className="panel__text">{handleValue(maiden_flight)}</p>
                                    </div>
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text"></p>
                                        <p className="panel__text"></p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    }
                    <div className="landscape-card__actions">
                        {(!navUrl && id) && (
                            <div className="landscape-card__action">
                                <LinkButton className="btn btn--primary" to={id.toString()} >
                                    <FontAwesomeIcon icon={faCircleInfo} /> INFO
                                </LinkButton>
                            </div>
                        )}

                        {navUrl && (
                            <div className="landscape-card__action">
                                <LinkButton className="btn btn--primary" to={url} >
                                    <FontAwesomeIcon icon={faShuttleSpace} /> View Launch
                                </LinkButton>
                            </div>)
                        }

                        { wiki_url ? (
                            <div className="landscape-card__action">
                                <LinkButton
                                    className="btn btn--primary"
                                    to={wiki_url}
                                    isExternal={true}
                                >
                                    <FontAwesomeIcon icon={faWikipediaW} /> Wiki
                                </LinkButton>
                            </div>
                        ) : (
                            <Tooltip content="No Wiki Available">
                                <div className="landscape-card__action">
                                    <LinkButton
                                        className="btn btn--primary"
                                        isExternal={true}
                                    >
                                        <FontAwesomeIcon icon={faWikipediaW} /> Wiki
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

export default SpacecraftCard;
