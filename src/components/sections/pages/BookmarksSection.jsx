import React from 'react';
import BookmarkCard from "@/components/cards/BookmarkCard.jsx";
import SkeletonBookmarkLoader from "@/components/skeleton/SkeletonBookmarkLoader.jsx";
import {useAuth} from "@/context/AuthProvider.jsx";
import {faBookmark } from '@fortawesome/free-solid-svg-icons';
import ContentSection from "@/layout/ContentSection.jsx";

const BookmarksSection = ({ bookmarks, isPending, isFetching, isError }) =>{
    const { status } = useAuth();
    const items = bookmarks || [];
    const contentConfig = {
        component: SkeletonBookmarkLoader,
        styles: {
            section: "bookmark-section",
            wrapper: "small-wrapper"
        },
    };

    const emptyList= {
        heading: "You haven't added any bookmarks yet!",
        message: "Start exploring and save your favorites here.",
        icon: faBookmark
    }

    const options = {
        showPrevBtn: false,
        showBackBtn: true,
        showItemsLimit: true,
        maxItems: 20
    }
    return (
        <ContentSection
            itemKeyExtractor={(item) => item.id}
            items={items || {}}
            isPending={isPending}
            isFetching={isFetching}
            isError={isError}
            contentConfig={contentConfig}
            CardComponent={BookmarkCard}
            options={options}
            emptyList={emptyList}
        />
    )
}
export default BookmarksSection;