import React from "react";
import {useParams} from "react-router-dom";
import SkeletonArticleLoader from "@/components/skeleton/SkeletonArticleLoader.jsx";
import {useParameterizedQuery} from "@/services/queries.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import ArticleContentSection from "@/components/sections/articles/ArticleContentSection.jsx";
import SpacecraftArticleContent from "@/components/sections/articles/SpacecraftArticleContent.jsx";

function SpacecraftConfigArticle(){
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/spacecraft`;
    const {id} = useParams();
    const spacecraftQuery = useParameterizedQuery({
        url: `${baseUrl}/${id}`,
        params: `spacecraft-${id}`,
        cacheKey: "spacecraft-article"
    });
    const data = spacecraftQuery?.data || [];
    const contentConfig = {
        component: SkeletonArticleLoader,
        count: 1
    };

    return(
        <>
            <Head
                title={data?.name}
                description={data?.details}
                image={data?.images?.[0]?.image_url}
                alt={data?.images?.[0]?.name}
                type="article"
            />
            <JsonLdGeneric
                title={data?.name}
                description={data?.details}
                image={data?.images?.[0]?.image_url}
                alt={data?.images?.[0]?.name }
            />
            <ArticleContentSection
                isPending={spacecraftQuery?.isPending}
                isFetching={spacecraftQuery?.isFetching}
                isError={spacecraftQuery?.isError}
                data={data}
                contentConfig={contentConfig}
                ArticleComponent={SpacecraftArticleContent}
            />
        </>
    )
}
export default SpacecraftConfigArticle;