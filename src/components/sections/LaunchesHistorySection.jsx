import { SkeletonLoader } from "@/components/loader/SkeletonLoader.jsx";
import LaunchCard from "@/components/cards/LaunchCard.jsx";
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";
import useLuxonDateTime from "@/hooks/time/useLuxonDateTime.jsx";
import ContentContainer from "@/layout/ContentContainer.jsx";

const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/grouped/launches`;

const LaunchesHistorySection = () => {

    const { getNow } = useLuxonDateTime();
    const searchParams = `day=${getNow().day}&month=${getNow().month}&limit=30`
    const queryData
        = useParameterizedQuery({
        url: `${baseUrl}?${searchParams}`,
        params: `pagination-${searchParams}`,
        cacheKey: "historical-launches",
    });
    const { isPending, isFetching, isError} = queryData;
    const launches = queryData.data || []
    const items = launches?._embedded?.launchGroupDTOes || [];
    const contentConfig = {
        component: SkeletonLandscapeLoader,
        styles: {
            section: "launches-history-ection",
            wrapper: "large-wrapper",
            grid: "grid__layout--landscape"
        },
    };

    const emptyList = {
        heading: "No Results Match Current Settings!",
        message: "Review your filters by clicking the Add Filter button above.",
    };

    return (
        <section className="launch-history">
            <ContentContainer size="medium">
                <SkeletonLoader
                    isPending={isPending}
                    isFetching={isFetching}
                    isError={isError}
                    contentConfig={contentConfig}
                >
                    {items && items.length > 0 ? (
                        items.map((group) => (
                            <div key={group?.year_difference} className="margin-block-end-12">
                                <SectionHeading title={`${group?.year_difference} years ago`}/>
                                <div className="flex flex-column gap-4">
                                    {group?.launches.map((launch) => (
                                        <LaunchCard
                                            key={launch.id}
                                            {...launch}
                                            navUrl={`/launches`}
                                            cardStyles={contentConfig?.styles}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="padding-8 text-center clr-neutral-1000">
                            <h2>{emptyList.heading}</h2>
                            <p>{emptyList.message}</p>
                        </div>
                    )}
                </SkeletonLoader>
            </ContentContainer>
        </section>
    );
};

export default LaunchesHistorySection;