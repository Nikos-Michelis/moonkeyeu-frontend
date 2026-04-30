import SkeletonPortraitLoader from "@/components/skeleton/SkeletonPortraitLoader.jsx";
import {OverlayCard} from "@/components/cards/OverlayCard.jsx";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";

const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/launches`;
const searchParams = 'page=1&limit=7&upcoming=true'

const UpcomingLaunchesSection = () => {
    const queryData
        = useParameterizedQuery({
        url: `${baseUrl}?${searchParams}`,
        params: `pagination-${searchParams}`,
        cacheKey: "next-upcoming-launch",
    });
    const { isPending, isFetching, isError} = queryData;
    const launches = queryData.data || []
    const items = (launches?._embedded?.launchNormalDTOes || []).slice(1);
    const contentConfig = {
        component: SkeletonPortraitLoader,
        count: 6,
        styles: {
            section: "astronauts-section",
        },
    };

    return (
        <div className={`grid__layout grid__layout--col-3`}>
            <SkeletonLoader
                isPending={isPending}
                isFetching={isFetching}
                isError={isError}
                contentConfig={contentConfig}
            >
                {items.length > 0 ? (
                    items.map((item) => (
                        <OverlayCard
                            key={item.id}
                            className={{content: "portrait-card--md", body: "portrait-card__container--overlay"}}
                            imageSrc={item?.image.image_url}
                            title={item.fullname}
                            description={item.description}
                            net={item.net}
                        />
                    ))
                ) : (
                    <div className="padding-8 text-center clr-neutral-1000">
                        <div>No upcoming launches available.</div>
                    </div>
                )}
            </SkeletonLoader>
        </div>
    );
}
export default UpcomingLaunchesSection