import React from "react";
import SkeletonArticleLoader from "@/components/skeleton/SkeletonArticleLoader.jsx";
import {useNasaApod} from "@/context/NasaApodProvider.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import ArticleContentSection from "@/components/sections/articles/ArticleContentSection.jsx";
import NasaApodArticleContent from "@/components/sections/articles/NasaApodArticleContent.jsx";

function NasaApodArticle(){
    const nasaApodQuery = useNasaApod();
    const data = nasaApodQuery?.data || [];

    const contentConfig = {
        component: SkeletonArticleLoader,
        count: 1
    };
    return(
        <>
            <Head
                title={data?.title}
                description={data?.explanation}
                image={data?.url}
                alt={data?.title}
                type="article"
            />
            <JsonLdGeneric
                title={data?.title}
                description={data?.explanation}
                image={data?.url}
                alt={data?.title}
            />
            <ArticleContentSection
                isPending={nasaApodQuery?.isPending}
                isFetching={nasaApodQuery?.isFetching}
                isError={nasaApodQuery?.isError}
                data={data}
                contentConfig={contentConfig}
                ArticleComponent={NasaApodArticleContent}
            />
        </>
    )
}
export default NasaApodArticle;