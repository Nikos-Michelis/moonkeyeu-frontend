import React from 'react';
import SkeletonPortraitLoader from "@/components/skeleton/SkeletonPortraitLoader.jsx";
import AstronautCard from "@/components/cards/AstronautCard.jsx";
import ContentSection from "@/layout/ContentSection.jsx";

const AstronautsSection = ({astronauts, isPending, isFetching, isError, pagination}) => {
    const contentConfig = {
        component: SkeletonPortraitLoader,
        styles: {
            section: "astronauts-section",
        },
    };

    const emptyList= {
        heading: "No Results Match Current Settings!",
        message: "Review your filters by clicking the Add Filter button above.",
    }

    const items = astronauts._embedded?.astronautNormalDTOes || [];

    return (
        <ContentSection
            itemKeyExtractor={(item) => item.id}
            items={items || {}}
            isPending={isPending}
            isFetching={isFetching}
            isError={isError}
            contentConfig={contentConfig}
            CardComponent={AstronautCard}
            emptyList={emptyList}
            pagination={pagination}
        />
    );
};

export default AstronautsSection;