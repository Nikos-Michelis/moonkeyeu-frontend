import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import SkeletonArticleLoader from "@/components/skeleton/SkeletonArticleLoader.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import {useStatePagination} from "@/hooks/paging-filtering/useStatePagination.jsx";
import ArticleContentSection from "@/components/sections/articles/ArticleContentSection.jsx";
import ProgramsArticleContent from "@/components/sections/articles/ProgramsArticleContent.jsx";

const LIMIT = 4;
function ProgramArticle(){
    const programsUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/program`;
    const launchesUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/launches`;
    const { id} = useParams();
    const programsQuery = useParameterizedQuery({
        url: `${programsUrl}/${id}`,
        params: `program-${id}`,
        cacheKey: "program-article"
    });
    const pagination = useStatePagination(LIMIT);
    const launchesQuery = useParameterizedQuery({
        url: `${launchesUrl}?limit=${pagination.itemsPerPage}&page=${pagination.page}&upcoming=false&program=${id}`,
        params: `article-launches-${id}-page-${pagination.page}`,
        cacheKey: "article-launches"
    });
    const queryData = { programsData: programsQuery || [], launchesData: launchesQuery };
    const data = programsQuery?.data || [];
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
                isPending={programsQuery?.isPending}
                isFetching={programsQuery?.isFetching}
                isError={programsQuery?.isError}
                queryData={queryData}
                pagination={pagination}
                contentConfig={contentConfig}
                ArticleComponent={ProgramsArticleContent}
            />
        </>
    )
}
export default ProgramArticle;