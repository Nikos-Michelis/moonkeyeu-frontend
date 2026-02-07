import React from 'react';
import ContentSection from "@/layout/ContentSection.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";
import AgencyCard from "@/components/cards/AgencyCard.jsx";
const AgenciesSection = ({ agencies, isFetching, isError}) => {
    const items = agencies?.data || [];
    const contentConfig = {
        component: SkeletonLandscapeLoader,
        styles: {
            section: "spacecraft-articles",
            wrapper: "small-wrapper",
            grid: "grid__layout--landscape"
        },
    };
    return (
        <ContentSection
            items={items}
            isFetching={isFetching}
            isError={isError}
            contentConfig={contentConfig}
            CardComponent={AgencyCard}
            itemKeyExtractor={(item) => item.id}
            isDetailed={true}
            pagination={false}
        />
    );
};
export default AgenciesSection;

