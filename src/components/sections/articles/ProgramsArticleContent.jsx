import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faCircleInfo, faShareFromSquare} from "@fortawesome/free-solid-svg-icons";
import Img from "@/components/utils/Img.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Tooltip from "@/components/tooltip/Tooltip.jsx";
import {faWikipediaW} from "@fortawesome/free-brands-svg-icons";
import UpcomingLaunch from "@/components/article-details/UpcomingLaunch.jsx";
import Agencies from "@/components/article-details/Agencies.jsx";
import Launch from "@/components/article-details/Launch.jsx";
import React from "react";
import useClipboard from "@/hooks/util/useClipboard.jsx";
import {DateTime} from "luxon";

const ProgramsArticleContent = ({queryData, pagination}) => {
    const programsData = queryData?.programsData?.data;
    const launchesQuery = queryData?.launchesData;
    const { copied, copyToClipboard } = useClipboard();
    const zonedDateTime = DateTime.fromISO(programsData?.start_date).setZone(DateTime.local().zoneName);
    const formattedZonedDateTime = zonedDateTime.toFormat('MMMM dd, yyyy');
    const handleShare = () => {
        copyToClipboard(window.location.href)
    };

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
                        src={programsData?.images?.[0]?.image_url}
                        alt={programsData?.images?.[0]?.name || "default"}
                        className="article__image article__image--scale-down"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <div className="container flex flex-column justify-center padding-2" data-type="full-bleed">
                    <div className="article__title-box">
                        <h3 className="article__title">{programsData?.name}</h3>
                        <div className="article__detail-row">
                            <h5 className="article__subtitle">{programsData?.type}</h5>
                            <h5 className="article__subtitle">{formattedZonedDateTime}</h5>
                        </div>
                    </div>
                    <hr className="hr-100-xs hr-my-sm"/>
                    <div className="article__detail-box">
                        <p className="article__description">{programsData?.description}</p>
                    </div>
                    <hr className="hr-100-xs hr-my-sm"/>
                    <div className="container flex justify-space-evenly align-center padding-block-2" data-type="full-bleed" data-overflow="visible">
                        { programsData?.info_url ? (
                            <div className="info">
                                <LinkButton
                                    className="btn--transparent btn-instragram"
                                    to={programsData?.info_url}
                                    isExternal={true}
                                >
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                </LinkButton>
                            </div>
                        ) : (
                            <Tooltip message="No Info Available">
                                <div className="info">
                                    <LinkButton
                                        className="btn--transparent btn-instagram"
                                        isExternal={true}
                                        disabled={true}
                                    >
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </LinkButton>
                                </div>
                            </Tooltip>
                        )}
                        { programsData?.wiki_url ? (
                            <div className="wiki">
                                <LinkButton
                                    className="btn--transparent btn-wiki"
                                    to={programsData?.wiki_url}
                                    isExternal={true}
                                >
                                    <FontAwesomeIcon icon={faWikipediaW} />
                                </LinkButton>
                            </div>
                        ) : (
                            <Tooltip message="No Wiki Available">
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
                        <div>
                            <Tooltip message={copied ? "Copied!" :"Copied to clipboard!"}>
                                <Button className="btn--transparent" onClick={handleShare} disabled={copied}>
                                    <FontAwesomeIcon icon={faShareFromSquare} />
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div className="article__info-container container flex flex-column" data-type="full-bleed">
                {launchesQuery?.data?.upcoming_launch && <UpcomingLaunch launch={launchesQuery?.data?.upcoming_launch}/>}
                {programsData?.agencies.length > 0 && <Agencies agencies={programsData?.agencies}/>}
                <Launch queryData={launchesQuery} navUrl={'/launches/'} pagination={pagination} hasPagination={true}/>
                <div className="padding-block-end-4">
                    <hr className="hr-90-md"/>
                </div>
            </div>
        </>
    )
}

export default ProgramsArticleContent;