import React from "react";
import LaunchCard from "@/components/cards/LaunchCard.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";
import ContentSection from "@/layout/ContentSection.jsx";

const LaunchesSection = (
    {
        launches,
        isFetching,
        isPending,
        isError,
        pagination,
        isBookmarked,
        emptyList,
        options,
        navUrl = undefined
    }) => {
    const items =  launches._embedded?.launchNormalDTOes || launches || [];

    const contentConfig = {
        component: SkeletonLandscapeLoader,
        styles: {
            section: "launches-section",
            wrapper: "large-wrapper",
            grid: "grid__layout--landscape"
        },
    };

    return (
        <>
            <ContentSection
                items={items}
                isFetching={isFetching}
                isPending={isPending}
                isError={isError}
                pagination={pagination}
                contentConfig={contentConfig}
                CardComponent={LaunchCard}
                itemKeyExtractor={(item) => item.id}
                isBookmarked={isBookmarked}
                emptyList={emptyList}
                options={options}
                navUrl={navUrl}
            />
        </>
    );
};

export default LaunchesSection;
