import React from 'react';
import ContentSection from "@/layout/ContentSection.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";
import ProgramsCard from "@/components/cards/ProgramsCard.jsx";

const ProgramsSection = ({ programs, isFetching, isError, pagination}) => {
    const items = programs._embedded?.programSummarizedDTOes || [];
    const contentConfig = {
        component: SkeletonLandscapeLoader,
        styles: {
            section: "programs-articles",
            wrapper: "small-wrapper",
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
            CardComponent={ProgramsCard}
            itemKeyExtractor={(item) => item.id}
        />
    );
};
export default ProgramsSection;
