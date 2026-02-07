import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import SkeletonArticleLoader from "@/components/skeleton/SkeletonArticleLoader.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import {useStatePagination} from "@/hooks/paging-filtering/useStatePagination.jsx";
import AgencyArticleContent from "@/components/sections/articles/AgencyArticleContent.jsx";
import ArticleContentSection from "@/layout/ArticleContentSection.jsx";

const LIMIT = 4;
function AgencyArticle(){
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/agency`;
    const rocketsUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/rockets`;
    const { id } = useParams();
    const pagination = useStatePagination(LIMIT);

    const agenciesQuery = useParameterizedQuery({
        url: `${baseUrl}/${id}`,
        params: `agency-${id}`,
        cacheKey: "agency-article"
    });

    const rocketConfigQuery = useParameterizedQuery({
        url: `${rocketsUrl}?limit=${pagination?.itemsPerPage}&page=${pagination?.page}&agency=${id}`,
        params: `rocketConfig-${id}-page-${pagination?.page}`,
        cacheKey: "rocketConfig"
    });

    const queryData = { agenciesQuery: agenciesQuery || [], rocketConfigQuery: rocketConfigQuery }
    const data = agenciesQuery?.data || [];

    const contentConfig = {
        component: SkeletonArticleLoader,
        count: 1
    };

    useEffect(() => {
        const total = rocketConfigQuery?.data?.page?.totalElements;
        if (total) {
            pagination.setTotalItems(total);
        }
    }, [rocketConfigQuery]);

    return(
        <>
            <Head
                title={data?.name}
                description={data?.description}
                image={data?.images?.[0]?.image_url}
                alt={data?.images?.[0]?.name }
                type="article"
            />
            <JsonLdGeneric
                title={data?.name}
                description={data?.description}
                image={data?.images?.[0]?.image_url}
                alt={data?.images?.[0]?.name }
            />
            <ArticleContentSection
                isPending={agenciesQuery?.isPending}
                isFetching={agenciesQuery?.isFetching}
                isError={agenciesQuery?.isError}
                queryData={queryData}
                pagination={pagination}
                contentConfig={contentConfig}
                ArticleComponent={AgencyArticleContent}
            />
        </>
    )
}
export default AgencyArticle;