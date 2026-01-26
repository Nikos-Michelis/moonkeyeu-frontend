import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import SkeletonArticleLoader from "@/components/skeleton/SkeletonArticleLoader.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import {useStatePagination} from "@/hooks/paging-filtering/useStatePagination.jsx";
import ArticleContentSection from "@/components/sections/articles/ArticleContentSection.jsx";
import LaunchPadArticleContent from "@/components/sections/articles/LaunchPadArticleContent.jsx";

const LIMIT = 4;
function LaunchPadArticle(){
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/launch-pad`;
    const launchesUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/launches`;
    const {id} = useParams();
    const launchPadQuery = useParameterizedQuery({
        url: `${baseUrl}/${id}`,
        params: `launch-pads-${id}`,
        cacheKey: "launch-pads-article"
    });
    const pagination = useStatePagination(LIMIT);
    const launchesQuery = useParameterizedQuery({
        url: `${launchesUrl}?limit=${pagination.itemsPerPage}&page=${pagination.page}&upcoming=false&pad=${id}`,
        params: `pad-launches-${id}-page-${pagination.page}`,
        cacheKey: "launch-pads-article"
    });
    const queryData = { launchPadQuery: launchPadQuery || [], launchesQuery: launchesQuery || [] }
    const data = queryData?.data || [];
    const contentConfig = {
        component: SkeletonArticleLoader,
        count: 1
    };
    useEffect(() => {
        const total = launchesQuery?.data?.page?.totalElements;
        if (total) {
            pagination.setTotalItems(total);
        }
    }, [launchesQuery]);

    return(
        <>
            <Head
                title={data?.name}
                description={data?.location?.description}
                image={data?.map_image}
                type="article"
            />
            <JsonLdGeneric
                title={data?.name}
                description={data?.location?.description}
                image={data?.map_image}
            />
            <ArticleContentSection
                isPending={launchPadQuery?.isPending}
                isFetching={launchPadQuery?.isFetching}
                isError={launchPadQuery?.isError}
                queryData={queryData}
                pagination={pagination}
                contentConfig={contentConfig}
                ArticleComponent={LaunchPadArticleContent}
            />
        </>
    )
}
export default LaunchPadArticle;