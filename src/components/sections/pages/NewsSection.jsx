import React from 'react';
import NewsArticle from "@/components/cards/NewsArticle.jsx";
import ContentSection from "@/layout/ContentSection.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";
const NewsSection = ({ articles, isPending, isFetching, isError, pagination }) => {
    const items = articles.results || [];
    const contentConfig = {
        component: SkeletonLandscapeLoader,
        styles: {
            section: "news-articles",
            wrapper: "small-wrapper",
            grid: "grid__layout--landscape"
        },
    };
    return (
        <ContentSection
            items={items}
            isFetching={isFetching}
            isPending={isPending}
            isError={isError}
            pagination={pagination}
            contentConfig={contentConfig}
            CardComponent={NewsArticle}
            itemKeyExtractor={(item) => item.id}
        />
    );
};
export default NewsSection;
