import React, {useState} from 'react';
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import Img from "@/components/utils/Img.jsx";
import { Button } from "@/components/button/Button.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";

const AgencyCard = ({id, name, type, administrator, description, spacecraft, launchers, wiki_url, images, country, isDetailed = false, cardStyles}) => {
    const [shareOpen, setShareOpen] = useState(false);
    const tooltipInfoMessage = id ? "" : "No Info Available";
    const url = window.location.origin + window.location.pathname + "/" + id;
    const { handleValue} = useDataFormatter();

    return (
        <article className={`landscape-card flex justify-center ${cardStyles?.wrapper || ''}`}>
            <div className={`landscape-card__container ${cardStyles?.card_type || ''}`}>
                <div className="landscape-card__media">
                    <Img
                        src={images?.[0]?.image_url}
                        alt={images?.[0]?.name || "default"}
                        className="landscape-card__image landscape-card__image--scale-down"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo-transparent.svg`}
                    />
                </div>
                <section className="landscape-card__content flex flex-column justify-space-evenly">
                    {!isDetailed &&
                        <>
                            <div className="landscape-card__detail-box">
                                <h4>{name}</h4>
                            </div>
                            <div className="landscape-card__detail-box">
                                <h5 className="agency-type">{type}</h5>
                            </div>
                            <div className="landscape-card__detail-box landscape-card--ellipsis">
                                <p>{description}</p>
                            </div>
                            <hr className="hr-100-sm"/>
                        </>
                    }
                    {isDetailed &&
                        <div className="panel">
                            <h4 className="panel__title">{handleValue(name)}</h4>
                            <hr/>
                            <div className="panel__wrapper">
                                <div className="panel__container">
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Type</p>
                                        <p className="panel__text">{handleValue(type)}</p>
                                    </div>
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">CountryCode</p>
                                        <p className="panel__text">{country?.[0]?.alpha_3_code}</p>
                                    </div>
                                </div>
                                <div className="panel__container">
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Spacecraft</p>
                                        <p className="panel__text">{handleValue(spacecraft)}</p>
                                    </div>
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Launchers</p>
                                        <p className="panel__text">{handleValue(launchers)}</p>
                                    </div>
                                </div>
                                <div className="panel__container">
                                    <div className="panel__detail-box fs-medium-200 padding-1">
                                        <p className="panel__text">Administrator</p>
                                        <p className="panel__text">{handleValue(administrator)}</p>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    }
                    <div className="landscape-card__actions">
                        {id ? (
                            <div className="landscape-card__action">
                                <Link className="btn btn--primary" to={`/agencies/${id.toString()}`} >
                                    <FontAwesomeIcon icon={faCircleInfo} /> INFO
                                </Link>
                            </div>
                        ) : (
                            <Tooltip content={tooltipInfoMessage}>
                                <div className="landscape-card__action">
                                    <Link className="btn btn--primary" to="#" >
                                        <FontAwesomeIcon icon={faCircleInfo} /> INFO
                                    </Link>
                                </div>
                            </Tooltip>
                        )}
                        { wiki_url ? (
                            <div className="landscape-card__action">
                                <LinkButton
                                    className="btn btn--primary"
                                    to={wiki_url}
                                    isExternal={true}
                                >
                                    <FontAwesomeIcon icon={faWikipediaW} /> WIKI
                                </LinkButton>
                            </div>
                        ) : (
                            <Tooltip content="No Wiki Available">
                                <div className="landscape-card__action">
                                    <LinkButton
                                        className="btn btn--primary"
                                        isExternal={true}
                                        disabled={true}
                                    >
                                        <FontAwesomeIcon icon={faWikipediaW} /> WIKI
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

export default AgencyCard;
