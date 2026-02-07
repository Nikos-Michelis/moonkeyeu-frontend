import React from 'react';
import ContentSection from "@/layout/ContentSection.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";
import LauncherCard from "@/components/cards/LauncherCard.jsx";

const LauncherSection = ({launcher, isFetching, isError, pagination}) => {
    const items = launcher._embedded?.launcherDTOes || [];
    const contentConfig = {
        component: SkeletonLandscapeLoader,
        styles: {
            section: "launcher-section",
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
            CardComponent={LauncherCard}
            itemKeyExtractor={(item) => item.id}
        />
    );
};

export default LauncherSection;
