import React from 'react';
import ContentSection from "@/layout/ContentSection.jsx";
import MessageCard from "@/components/cards/MessageCard.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";
import {faMessage} from "@fortawesome/free-solid-svg-icons";

const MessagesSection = ({ messages, isPending , isFetching , isError, pagination }) =>{
    const items = messages._embedded?.contactDTOes || [];

    const contentConfig = {
        component: SkeletonLandscapeLoader,
        styles: {
            section: "messages-section",
            wrapper: "small-wrapper",
            grid: "grid__layout--landscape"
        },
    };
    const emptyList= {
        heading: "There are no messages at the moment!",
        message: "Once we receive a message, it will appear here.",
        icon: faMessage
    }
    const options = {
        showBackBtn: true,
        showItemsLimit: false,
        maxItems: 20

    }
    return(
        <>
            <ContentSection
                items={items}
                isFetching={isFetching}
                isPending={isPending}
                isError={isError}
                pagination={pagination}
                contentConfig={contentConfig}
                CardComponent={MessageCard}
                itemKeyExtractor={(item) => item.id}
                emptyList={emptyList}
                options={options}
            />
        </>
    );
}
export default MessagesSection;