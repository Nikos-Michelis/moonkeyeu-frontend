import {useParams} from "react-router-dom";
import SkeletonArticleLoader from "@/components/skeleton/SkeletonArticleLoader.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdEvent from "@/components/seo/jsonld/JsonLdEvent.jsx";
import ArticleContentSection from "@/layout/ArticleContentSection.jsx";
import LaunchArticleContent from "@/components/sections/articles/LaunchArticleContent.jsx";

function LaunchArticle() {
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/launch`;
    const { id } = useParams();
    const newsQuery = useParameterizedQuery({
        url: `${import.meta.env.VITE_NEWS_API_URL}&launch=${id}}`,
        params: `launch-${id}`,
        cacheKey: `latest-news`,
        enableBoundary: false
    });
    const launchQuery = useParameterizedQuery({
        url: `${baseUrl}/${id}`,
        params: `launch-${id}`,
        cacheKey: 'launch-article'
    });
    const queryData = { launchData: launchQuery || [], newsData: newsQuery || [] }
    const launchData = launchQuery?.data
    const contentConfig = {
        component: SkeletonArticleLoader,
        count: 1
    };

    return(
        <>
            <Head
                title={launchData?.fullname}
                description={launchData?.mission?.description}
                image={launchData?.image?.image_url}
                alt={launchData?.image?.name}
                type="article"

            />
            <JsonLdEvent
                title={launchData?.fullname}
                description={launchData?.description}
                image={launchData?.image?.launchData?.image_url}
                startDate={launchData?.window_start}
                endDate={launchData?.window_end}
                location={launchData?.pad}
                agency={launchData?.launch_provider?.name}
            />
            <ArticleContentSection
                isPending={launchQuery?.isPending}
                isFetching={launchQuery?.isFetching}
                isError={launchQuery?.isError}
                data={queryData}
                contentConfig={contentConfig}
                ArticleComponent={LaunchArticleContent}
            />
        </>
    )
}
export default LaunchArticle;