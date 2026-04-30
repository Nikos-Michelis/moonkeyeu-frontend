import {useSpaceFlightNews} from "@/context/SpaceFlightNewsProvider.jsx";
import SkeletonNewsLoader from "@/components/skeleton/SkeletonNewsLoader.jsx";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import LatestNewsGrid from "@/components/sections/LatestNewsGrid.jsx";
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";

const LatestNewsSections = () => {
    const { data, isPending, isFetching, isError } = useSpaceFlightNews();
    const first = data?.results?.length > 0 ? data?.results[0] : []
    const items = {first: first, results: data?.results};

    const contentConfig = {
        component: SkeletonNewsLoader,
        count: 1,
        styles: {
            section: "news-articles",
        },
    };
    return (
        <section className="news-section">
            <SectionHeading title="Latest News" linkText="ALL NEWS"/>
            <SkeletonLoader
                isPending={isPending}
                isFetching={isFetching}
                isError={isError}
                contentConfig={contentConfig}
            >
                <LatestNewsGrid
                    data={items}
                />
            </SkeletonLoader>
        </section>
    )
}

export default LatestNewsSections;