import ScrollToTop from "@/components/utils/ScrollToTop.jsx";
import React from "react";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import ContentLayout from "@/layout/ContentLayout.jsx";

const ArticleSection = (data, contentConfig, ArticleComponent) => {
    return (
        <>
            <ScrollToTop behavior="auto" />
            <SkeletonLoader
                isFetching={data?.isFetching}
                isPending={data?.isFetching}
                isError={data?.isError}
                contentConfig={contentConfig}>
                <section className="article">
                    <div className="container flex justify-center" data-type="wide" data-spacing="none">
                        <ContentLayout className="article__content" size="medium">
                            <ArticleComponent data={data}/>
                        </ContentLayout>
                    </div>
                </section>
            </SkeletonLoader>
        </>
    );
}