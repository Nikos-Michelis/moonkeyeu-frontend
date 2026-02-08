import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faCircleInfo, faShareFromSquare} from "@fortawesome/free-solid-svg-icons";
import Img from "@/components/utils/Img.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Tooltip from "@/components/modal/tooltip/Tooltip.jsx";
import {faWikipediaW} from "@fortawesome/free-brands-svg-icons";
import UpcomingLaunch from "@/components/article-details/UpcomingLaunch.jsx";
import Agencies from "@/components/article-details/Agencies.jsx";
import Launch from "@/components/article-details/Launch.jsx";
import React, {useState} from "react";
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";
import ShareContent from "@/components/modal/ShareContent.jsx";

const LaunchPadArticleContent = ({queryData, pagination}) => {
    const [shareOpen, setShareOpen] = useState(false);
    const {handleValue, booleanConverter} = useDataFormatter();
    const data = queryData?.launchPadQuery?.data;
    const launchesQuery = queryData?.launchesQuery;
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
                        src={data?.map_image}
                        alt={data?.name || "default"}
                        className="article__image"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <div className="container flex flex-column justify-center padding-2" data-type="full-bleed">
                    <div className="article__title-box">
                        <h3 className="article__title">{data?.name}</h3>
                        <h5 className="article__subtitle">{data?.location?.name}</h5>
                    </div>
                    <div className="panel">
                        <hr/>
                        <div className="panel__wrapper">
                            <div className="panel__container">
                                <div className="panel__detail-box fs-small-200 padding-2">
                                    <p className="panel__text">Active</p>
                                    <p className="panel__text">{handleValue(booleanConverter(data?.active))}</p>
                                </div>
                                <div className="panel__detail-box fs-small-200 padding-2">
                                    <p className="panel__text">Total launches</p>
                                    <p className="panel__text">{data?.total_launch_count}</p>
                                </div>
                            </div>
                            <hr/>
                            {data?.description &&
                                <>
                                    <div className="panel__container">
                                        <div className="panel__detail-box padding-1">
                                            <p className="panel__description">{data?.description}</p>
                                        </div>
                                    </div>
                                    <hr/>
                                </>
                            }
                        </div>
                    </div>
                    <div className="container flex justify-space-evenly align-center padding-block-2" data-type="full-bleed" data-overflow="visible">
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
                                        className="btn--transparent btn-wikipedia"
                                        isExternal={true}
                                        disabled={true}
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
                                    to={data?.wiki_url}
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
                                        disabled={true}
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
                {data?.location?.description &&
                    <section className="location-section">
                        <div className="container flex flex-wrap justify-center align-center padding-block-8" data-type="full-bleed">
                            <div className="flex justify-space-between margin-block-2">
                                <p>{data?.location?.description}</p>
                            </div>
                        </div>
                    </section>
                }
                {data?.upcoming_launch && <UpcomingLaunch launch={data?.upcoming_launch}/>}
                {data?.agencies.length > 0 && <Agencies agencies={data?.agencies}/>}
                <Launch queryData={launchesQuery} navUrl={'/launches'} pagination={pagination} hasPagination={true}/>
                <div className="padding-block-end-4">
                    <hr className="hr-90-md"/>
                </div>
            </div>
        </>
    );
}
export default LaunchPadArticleContent;
