import React from 'react';
import RocketCard from "@/components/cards/RocketCard.jsx";
import ContentSection from "@/layout/ContentSection.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";

const RocketSection = ({rocket, isFetching, isError, pagination}) => {
    const items = rocket._embedded?.rocketConfigSummarizedDTOes || [];
    const contentConfig = {
        component: SkeletonLandscapeLoader,
        styles: {
            section: "rocket-articles",
            wrapper: "medium-wrapper",
            grid: "grid__layout--landscape"

        },
    };
    return (
        <ContentSection
            items={items}
            isFetching={isFetching}
            isError={isError}
            pagination={pagination}
            contentConfig={contentConfig}
            CardComponent={RocketCard}
            itemKeyExtractor={(item) => item.id}
        />
    );
};

export default RocketSection;
