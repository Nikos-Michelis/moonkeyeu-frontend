import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAlignLeft,
    faChevronLeft,
    faCircleInfo,
    faHourglass,
    faShareFromSquare, faTimeline
} from "@fortawesome/free-solid-svg-icons";
import Img from "@/components/utils/Img.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import {faWikipediaW} from "@fortawesome/free-brands-svg-icons";
import React, {useState} from "react";
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";

const SpacecraftArticleContent = ({data}) => {
    const {handleValue, booleanConverter} = useDataFormatter();
    const [shareOpen, setShareOpen] = useState(false);
    const url = window.location.href;

    return (
        <>
            <div className="container flex justify-start padding-block-start-7 padding-block-end-2">
                <Button className="btn--transparent" onClick={() => window.history.back()}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                </Button>
            </div>
            <div className="container article__overview flex flex-column justify-center align-center" data-type="full-bleed">
                <div className="article__image-box">
                    <Img
                        src={data.images?.[0]?.image_url}
                        alt={data.images?.[0]?.name || "default"}
                        className="article__image"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <div className="container flex flex-column justify-center padding-2" data-type="full-bleed">
                    <div className="panel">
                        <h3 className="panel__title">{handleValue(data?.name)}</h3>
                        <h5 className="panel__subtitle">{handleValue(data?.agency?.name)}</h5>
                        <hr/>
                        <div className="panel__wrapper">
                            <div className="panel__container">
                                <div className="panel__detail-box fs-small-200 padding-1">
                                    <p className="panel__text">Type</p>
                                    <p className="panel__text">{handleValue(data?.type)}</p>
                                </div>
                                <div className="panel__detail-box fs-small-200 padding-1">
                                    <p className="panel__text">In Use</p>
                                    <p className="panel__text">{handleValue(booleanConverter(data?.in_use))}</p>
                                </div>
                            </div>
                            <div className="panel__container">
                                <div className="panel__detail-box fs-small-200 padding-1">
                                    <p className="panel__text">Height</p>
                                    <p className="panel__text">{handleValue(data?.height)}</p>
                                </div>
                                <div className="panel__detail-box fs-small-200 padding-1">
                                    <p className="panel__text">Diameter</p>
                                    <p className="panel__text">{handleValue(data?.diameter)}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="panel__wrapper">
                            <div className="panel__container">
                                <div className="panel__detail-box fs-small-200 padding-1">
                                    <p className="panel__text">Payload Capacity</p>
                                    <p className="panel__text">{handleValue(data?.payload_capacity, "kg")}</p>
                                </div>
                                <div className="panel__detail-box fs-small-200 padding-1">
                                    <p className="panel__text">Maiden Flight</p>
                                    <p className="panel__text">{handleValue(data?.maiden_flight)}</p>
                                </div>
                            </div>
                            <div className="panel__container">
                                <div className="panel__detail-box fs-small-200 padding-1">
                                    <p className="panel__text">Crew Capacity</p>
                                    <p className="panel__text">{handleValue(data?.crew_capacity)}</p>
                                </div>
                                <div className="panel__detail-box fs-small-200 padding-1">
                                    <p className="panel__text">Human Rated</p>
                                    <p className="panel__text">{handleValue(booleanConverter(data?.human_rated))}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="flex justify-space-evenly align-center padding-block-2">
                        { data?.info_url ? (
                            <div className="info">
                                <LinkButton
                                    className="btn--transparent btn-instragram"
                                    to={data.info_url}
                                    isExternal={true}
                                >
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </LinkButton>
                            </div>
                        ) : (
                            <Tooltip content="No Info Available">
                                <div className="info">
                                    <LinkButton
                                        className="btn--transparent btn-instragram"
                                        isExternal={true}
                                    >
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </LinkButton>
                                </div>
                            </Tooltip>
                        )}
                        { data?.wiki_url ? (
                            <div className="wiki">
                                <LinkButton
                                    className="btn--transparent btn-wiki"
                                    to={data.wiki_url}
                                    isExternal={true}
                                >
                                    <FontAwesomeIcon icon={faWikipediaW} />
                                </LinkButton>
                            </div>
                        ) : (
                            <Tooltip content="No Wiki Available">
                                <div className="wiki">
                                    <LinkButton
                                        className="btn--transparent btn-wikipedia"
                                        isExternal={true}
                                    >
                                        <FontAwesomeIcon icon={faWikipediaW} />
                                    </LinkButton>
                                </div>
                            </Tooltip>
                        )}
                        <div className="landscape-card__action">
                            <Button
                                className="btn--transparent"
                                onClick={() => setShareOpen(true)}
                            >
                                <FontAwesomeIcon icon={faShareFromSquare} />
                            </Button>
                        </div>
                        <Modal open={shareOpen} onOpenChange={setShareOpen}>
                            <Modal.Content title="Share">
                                <ShareContent url={url} title={data?.name} />
                            </Modal.Content>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="article__info-container container flex flex-column" data-type="full-bleed">
                <section className="spacecraft-section">
                    <div className="article__info-box">
                        <FontAwesomeIcon icon={faHourglass} />
                        <span>Flight Life</span>
                        <p>{data?.flight_life}</p>
                    </div>
                    <div className="article__info-box">
                        <FontAwesomeIcon icon={faAlignLeft} />
                        <span>Description</span>
                        <p>{data?.details}</p>
                    </div>
                    <div className="article__info-box">
                        <FontAwesomeIcon icon={faTimeline} />
                        <span>History</span>
                        <p>{data?.history}</p>
                    </div>
                    <div className="padding-block-4">
                        <hr className="hr-90-md"/>
                    </div>
                </section>
            </div>
        </>
    );
}

export default SpacecraftArticleContent;