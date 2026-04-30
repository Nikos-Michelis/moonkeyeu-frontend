import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import {OverlayCard} from "@/components/cards/OverlayCard.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import {SkeletonOverlayCard} from "@/components/skeleton/SkeletonOverlayCard.jsx";

const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/launches`;
const searchParams = 'page=1&limit=1&upcoming=true'

const NextUpcomingLaunchSection = () => {
    const queryData
        = useParameterizedQuery({
        url: `${baseUrl}?${searchParams}`,
        params: `pagination-${searchParams}`,
        cacheKey: "next-upcoming-launch",
    });
    const { isPending, isFetching, isError} = queryData;
    const contentConfig = {
        component: SkeletonOverlayCard,
        count: 1,
        className: {
            content: "portrait-card--md",
            body: "portrait-card__container--overlay"
        },
        styles: {
            section: "next-upcoming-launch",
        },
    };
    const launches = queryData.data || []
    const items =  launches?._embedded?.launchNormalDTOes || [];
    const launch = items?.[0];

    return (
        <>
            <SectionHeading title="Next Upcoming Launch" linkText="ALL Launches"/>
            <div className="flex justify-center">

                <SkeletonLoader
                    isPending={isPending}
                    isFetching={isFetching}
                    isError={isError}
                    contentConfig={contentConfig}>
                    {launch ? (
                        <OverlayCard
                            className={{content: "portrait-card--md", body: "portrait-card__container--overlay"}}
                            imageSrc={launch?.image.image_url}
                            title={launch.fullname}
                            description={launch.rocket_config_description}
                            net={launch.net}
                        />
                    ) : (
                        <div>No Next upcoming launch is available at the moment.</div>
                    )
                    }
                </SkeletonLoader>
            </div>
        </>
    );
}

export default NextUpcomingLaunchSection;