import React from "react";
import ScrollToTop from "@/components/utils/ScrollToTop.jsx";
import { SkeletonLoader } from "@/components/loader/SkeletonLoader.jsx";
import ContentContainer from "@/layout/ContentContainer.jsx";

const ArticleContentSection = (
    {
        data = {},
        queryData = {},
        pagination,
        isPending,
        isFetching,
        isError,
        contentConfig,
        ArticleComponent
    }) => {
    return (
        <>
            <ScrollToTop behavior="auto" />
            <SkeletonLoader
                isFetching={isPending}
                isPending={isFetching}
                isError={isError}
                contentConfig={contentConfig}>
                <section className="article">
                    <div className="container flex justify-center" data-type="wide" data-spacing="none">
                        <ContentContainer className="article__content" size="medium">
                            <ArticleComponent data={data} queryData={queryData} pagination={pagination}/>
                        </ContentContainer>
                    </div>
                </section>
            </SkeletonLoader>
        </>
    );
}

export default ArticleContentSection;