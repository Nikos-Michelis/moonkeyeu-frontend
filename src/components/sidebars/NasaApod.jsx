import React from 'react';
import NewsArticle from "../cards/NewsAsideArticle.jsx";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import SkeletonSidebarLoader from "@/components/skeleton/SkeletonSidebarLoader.jsx";
import { faImage } from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import useLuxonDateTime from "@/hooks/time/useLuxonDateTime.jsx";

const NasaApod = ({nasaApod, isPendingNasaApod, isFetchingNasaApod, isErrorNasaApod}) => {
    const contentConfig = {
        count:1,
        component: SkeletonSidebarLoader,
    };
    const { getZonedAndFormattedDateTime } = useLuxonDateTime();
    const formattedZonedDateTime = getZonedAndFormattedDateTime(nasaApod?.date, 'MMMM dd, yyyy');

    return (
        <section className="nasa-apod">
            <div className="flex flex-column justify-center align-center">
                <div className="sidebar container flex flex-column justify-center align-center padding-4" data-type="full-bleed">
                    <div className="sidebar__heading-box">
                        <h3 className="ff-accent">Astronomy Picture of the Day</h3>
                    </div>
                    <SkeletonLoader
                        isPending={isPendingNasaApod}
                        isFetching={isFetchingNasaApod}
                        isError={isErrorNasaApod}
                        contentConfig={contentConfig}>
                        {nasaApod ? (
                            <NewsArticle
                                imageSrc={nasaApod.url}
                                url="/nasa-apod"
                                title={nasaApod.title}
                                author="NASA"
                                date={formattedZonedDateTime}
                            />
                            ) : (
                                <div>No image available at the moment.</div>
                            )
                        }
                    </SkeletonLoader>
                    <div className="flex justify-center">
                        <LinkButton className="btn btn--primary btn--lg" to="/nasa-apod" disabled={isErrorNasaApod}>
                            <FontAwesomeIcon icon={faImage} /> VIEW IMAGE
                        </LinkButton>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default NasaApod;
