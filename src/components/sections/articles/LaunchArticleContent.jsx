import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faChevronLeft,
    faLocationDot,
    faShareFromSquare,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from "@/components/timers/CountdownTimer.jsx";
import Img from "@/components/utils/Img.jsx";
import Tooltip from "@/components/tooltip/Tooltip.jsx";
import YoutubeVideo from "@/components/article-details/YoutubeVideo.jsx";
import Trajectory from "@/components/article-details/Trajectory.jsx";
import Agency from "@/components/article-details/Agency.jsx";
import Mission from "@/components/article-details/Mission.jsx";
import Spacecraft from "@/components/article-details/Spacecraft.jsx";
import Crew from "@/components/article-details/Crew.jsx";
import Location from "@/components/article-details/Locations.jsx";
import Rocket from "@/components/article-details/Rocket.jsx";
import Boosters from "@/components/article-details/Boosters.jsx";
import RelatedPrograms from "@/components/article-details/RelatedPrograms.jsx";
import RelatedNews from "@/components/article-details/RelatedNews.jsx";
import React from "react";
import {DateTime} from "luxon";
import useClipboard from "@/hooks/util/useClipboard.jsx";
import useComparator from "@/hooks/util/useComparator.jsx";

const LaunchArticleContent = ({ data }) => {
    const launchData = data?.launchData?.data;
    const launcherStage = launchData?.rocket?.launcher_stage || [];
    const spacecraftStage = launchData.rocket?.spacecraft_stage || [];
    const programs = launchData?.programs || [];
    const rocketConfig = launchData.rocket?.configuration || {};
    const zonedDateTime = DateTime.fromISO(launchData.net).setZone(DateTime.local().zoneName);
    const formattedZonedDateTime = zonedDateTime.invalid === null? zonedDateTime.toFormat('MMMM dd, yyyy - hh:mm a ZZZZ') : null;
    const { copied, copyToClipboard } = useClipboard();
    const recommendedVideo = useComparator(
        launchData?.video_urls?.filter(video =>
            video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be")
        ), (a, b) => a.priority > b.priority);
    const handleShare = () => {
        copyToClipboard(window.location.href)
    };

    return (
        <>
            <div className="container flex justify-start padding-block-start-7 padding-block-end-2">
                <Button
                    className="btn--transparent"
                    onClick={() => window.history.back()}
                >
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                </Button>
            </div>
            <div className="container article__overview flex flex-column justify-center align-center" data-type="full-bleed">
                {zonedDateTime.invalid === null && zonedDateTime > Date.now()
                    && (<CountdownTimer net={zonedDateTime} timerStyle="counter--container"/>)
                }
                <div className="article__image-box">
                    <Img
                        src={rocketConfig?.image?.image_url}
                        alt={rocketConfig?.image?.name || "default"}
                        className="article__image"
                        defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                    />
                </div>
                <div className="article__detail-container container flex flex-column justify-center" data-type="full-bleed">
                    <div className="article__title-box">
                        <h3 className="article__title">{launchData?.fullname}</h3>
                        <h5 className="article__subtitle">{launchData.launch_provider?.name}</h5>
                    </div>
                    <hr className="hr-100-xs hr-my-xs"/>
                    <div className="article__detail-box">
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                        <p className="article__text">{launchData?.status}</p>
                    </div>
                    <div className="article__detail-box">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <p className="article__text">{formattedZonedDateTime}</p>
                    </div>
                    <div className="article__detail-box">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p className="article__text">{launchData.pad?.location?.name}</p>
                    </div>
                    <hr className="hr-100-xs hr-my-xs"/>
                    <div className="container flex justify-space-evenly align-center padding-block-2" data-type="full-bleed" data-overflow="visible">
                        <Tooltip message={copied ? "Copied!" :"Copied to clipboard!"}>
                            <Button className="btn--transparent" onClick={handleShare} disabled={copied}>
                                <FontAwesomeIcon icon={faShareFromSquare} />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="article__info-container container flex flex-column" data-type="full-bleed">
                { (recommendedVideo || launchData?.video_urls?.length > 0) &&
                <YoutubeVideo recommendedVideo={recommendedVideo} videos={launchData?.video_urls} /> }
                <Trajectory flightclub_url={launchData.flightclub_url}/>
                <Agency launchProvider={launchData.launch_provider}/>
                {launchData?.mission &&
                    <Mission
                        mission={launchData.mission || {}}
                        launchCost={rocketConfig.launch_cost}
                        missionPatches={launchData.mission_patches || []}
                    />
                }
                {spacecraftStage.length > 0 &&
                    <Spacecraft stage={spacecraftStage[0] || []}/>
                }
                {spacecraftStage[0] &&
                    spacecraftStage[0]?.crew?.length > 0 &&
                    <Crew key={launchData.rocket.id} crew={spacecraftStage[0].crew || []}/>
                }
                {launchData?.pad && <Location pad={launchData?.pad}/>}
                {rocketConfig && <Rocket {...rocketConfig}/>}
                {launcherStage.length > 0 && <Boosters stage={launcherStage} />}
                {programs.length > 0 && <RelatedPrograms programs={programs} />}
                <RelatedNews queryData={data?.newsData}/>
                <section className="last-update-section">
                    <div className="flex flex-wrap justify-center align-center padding-block-start-8">
                        <p>Last Updated: {formattedZonedDateTime}</p>
                    </div>
                </section>
                <div className="padding-block-end-4">
                    <hr className="hr-90-md"/>
                </div>
            </div>
        </>
    );
}

export default LaunchArticleContent;