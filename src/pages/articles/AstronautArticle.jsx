import React from "react";
import {useParams} from "react-router-dom";
import SkeletonArticleLoader from "@/components/skeleton/SkeletonArticleLoader.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdPerson from "@/components/seo/jsonld/JsonLdPerson.jsx";
import ArticleContentSection from "@/components/sections/articles/ArticleContentSection.jsx";
import AstronautArticleContent from "@/components/sections/articles/AstronautArticleContent.jsx";

function AstronautArticle(){
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/astronaut`;
    const {id} = useParams();
    const queryData
        = useParameterizedQuery({
            url: `${baseUrl}/${id}`,
            params: `astronaut-${id}`,
            cacheKey: "astronaut-article"
        });
    const data = queryData?.data || [];
    const agency = data?.agency || {};
    const contentConfig = {
        component: SkeletonArticleLoader,
        count: 1
    };

    return(
        <>
            <Head
                title={data?.name}
                description={data?.bio}
                image={data.images?.[0]?.image_url}
                alt={data.images?.[0]?.name}
                type="article"
            />
            <JsonLdPerson
                name={data?.name}
                birthDate={data?.date_of_birth}
                nationality={data.nationality?.length > 0 ? data.nationality[0]?.nationality_name : null}
                agency={agency?.name}
            />
            <ArticleContentSection
                isPending={queryData?.isPending}
                isFetching={queryData?.isFetching}
                isError={queryData?.isError}
                data={data}
                contentConfig={contentConfig}
                ArticleComponent={AstronautArticleContent}
            />
        </>
    )
}
export default AstronautArticle;