import React from "react";
import LaunchCard from "@/components/cards/LaunchCard.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCircleXmark, faRocket} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import StatePagination from "@/components/pagination/StatePagination.jsx";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";

const Launch = ({ launches = {}, queryData= {}, navUrl= "", pagination, hasPagination = false }) => {
    const parsedLaunches = queryData?.data?._embedded?.launchNormalDTOes || launches || [];
    const contentConfig = {
        component: SkeletonLandscapeLoader,
        count: 4,
        scroll: 2,
        styles: {
            wrapper: "article-card--medium-wrapper",
            section: "launches-articles",
            card_type: "landscape-card__container--article-card"
        },
    };
    const sortedLaunches =
        parsedLaunches && parsedLaunches.length > 0
            ? [...parsedLaunches].sort(
                (b, a) => new Date(b.net).getTime() - new Date(a.net).getTime()
            ) : [];

    return (
        <section className="launches-section">
            <div className="article__heading-box">
                <FontAwesomeIcon icon={faRocket} />
                <h2>Related Launches</h2>
            </div>
            <hr className="hr-100-sm" />
            <div className="flex justify-center align-center padding-block-8">
                <div className="container"
                     data-spacing="none"
                     data-type="full-width"
                     data-scroll={(!hasPagination && launches.length > contentConfig?.scroll)  ? "vertical" : undefined}
                >
                    <div className="margin-block-5 margin-inline-4">
                        { (hasPagination && pagination?.totalItems > contentConfig?.count) && <StatePagination pagination={pagination}  {...queryData}/>}
                        <div className="grid__layout grid__layout--landscape padding-block-2 margin-block-4">
                            <SkeletonLoader
                                isPending={queryData?.isPending}
                                isFetching={queryData?.isFetching}
                                isError={queryData?.isError}
                                contentConfig={contentConfig}
                            >
                                {sortedLaunches.length > 0 ? (
                                    sortedLaunches.map((launch) => (
                                        <LaunchCard
                                            key={launch.id}
                                            {...(launch.launch ?? launch)}
                                            navUrl={navUrl}
                                            cardStyles={contentConfig?.styles}
                                        />
                                    ))
                                ) : (
                                    <div className="padding-8 text-center clr-neutral-1000">
                                        <FontAwesomeIcon icon={faFileCircleXmark} className="fs-large-700 margin-block-end-6"/>
                                        <p>Launches is not available. Check back for updates.</p>
                                    </div>
                                )}
                            </SkeletonLoader>
                        </div>
                        { (hasPagination && pagination?.totalItems > contentConfig?.count) && <StatePagination pagination={pagination}  {...queryData}/> }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Launch;

Launch.propTypes = {
    launches: PropTypes.array,
    navUrl: PropTypes.string.isRequired,
    pagination: PropTypes.object,
};