import ScrollToTop from "@/components/utils/ScrollToTop.jsx";
import React from "react";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import ContentLayout from "@/layout/ContentLayout.jsx";

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
                        <ContentLayout className="article__content" size="medium">
                            <ArticleComponent data={data} queryData={queryData} pagination={pagination}/>
                        </ContentLayout>
                    </div>
                </section>
            </SkeletonLoader>
        </>
    );
}

export default ArticleContentSection;