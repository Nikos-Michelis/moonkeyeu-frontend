import {useParams} from "react-router-dom";
import SkeletonArticleLoader from "@/components/skeleton/SkeletonArticleLoader.jsx";
import React from "react";
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
    const data = { launchData: launchQuery || [], newsData: newsQuery || [] }

    const contentConfig = {
        component: SkeletonArticleLoader,
        count: 1
    };

    return(
        <>
            <Head
                title={data?.launchData?.fullname}
                description={data?.launchData?.mission?.description}
                image={data?.launchData?.image?.image_url}
                alt={data?.launchData?.image?.name}
                type="article"

            />
            <JsonLdEvent
                title={data?.launchData?.fullname}
                description={data?.launchData?.description}
                image={data?.launchData.image?.launchData?.image_url}
                startDate={data?.launchData?.window_start}
                endDate={data?.launchData?.window_end}
                location={data?.launchData?.pad}
                agency={data?.launchData?.launch_provider?.name}
            />
            <ArticleContentSection
                isPending={launchQuery?.isPending}
                isFetching={launchQuery?.isFetching}
                isError={launchQuery?.isError}
                data={data}
                contentConfig={contentConfig}
                ArticleComponent={LaunchArticleContent}
            />
        </>
    )
}
export default LaunchArticle;