import { SkeletonLoader } from "@/components/loader/SkeletonLoader.jsx";
import { Button } from "@/components/button/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Pagination from "@/components/pagination/Pagination.jsx";
import PreviousButton from "@/components/button/PreviousButton.jsx";
import Aside from "@/components/sidebars/Aside.jsx";

const ContentSection = (
    {
        items = [],
        isFetching,
        isPending,
        isError,
        pagination,
        contentConfig,
        CardComponent,
        itemKeyExtractor,
        isBookmarked,
        emptyList = {
            heading: "No Results Match Current Settings!",
            message: "Review your filters by clicking the Add Filter button above.",
        },
        options = {},
        navUrl,
        isDetailed
    }) => {
    const { showPrevBtn = false,  showBackBtn = false,  showItemsLimit = false,  maxItems = 20} = options;
    const hasItems = items.length > 0;
    const isLoading = isPending || isFetching;
    const gridClassName = (hasItems || isLoading) ? `grid__layout ${contentConfig?.styles?.grid || ''}` : undefined;

    return (
        <section className={contentConfig?.styles?.section || undefined}>
            <div className="grid__container container margin-block-end-15" data-overflow="visible" data-type="full-bleed">
                <div className="grid__wrapper">
                    {showPrevBtn && <div className="flex"><PreviousButton /></div>}
                    {(showBackBtn || showItemsLimit) &&
                        <div className="flex justify-space-between align-center margin-block-end-4">
                            {showBackBtn && (
                                <Button
                                    className="btn--transparent margin-block-2"
                                    onClick={() => window.history.back()}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                                </Button>
                            )}
                            {showItemsLimit && (
                                <div className="fs-small-300 fw-bold">
                                    {items.length} / {maxItems}
                                </div>
                            )}
                        </div>
                    }
                    <div className={gridClassName}>
                        <SkeletonLoader
                            isPending={isPending}
                            isFetching={isFetching}
                            isError={isError}
                            contentConfig={contentConfig}
                        >
                            {hasItems ? (
                                items.map((item) => (
                                    <CardComponent
                                        key={itemKeyExtractor(item)}
                                        {...item}
                                        isBookmarked={isBookmarked}
                                        navUrl={navUrl}
                                        isDetailed={isDetailed}
                                        cardStyles={contentConfig?.styles}
                                    />
                                ))
                            ) : (
                                <div className="padding-8 text-center clr-neutral-1000">
                                    <h2>{emptyList.heading}</h2>
                                    <p>{emptyList.message}</p>
                                </div>
                            )}
                        </SkeletonLoader>
                    </div>
                    {(hasItems && pagination) && (
                        <Pagination
                            {...pagination}
                            isPending={isPending}
                            isFetching={isFetching}
                        />
                    )}
                </div>
                <Aside />
            </div>
        </section>
    );
};

export default ContentSection;