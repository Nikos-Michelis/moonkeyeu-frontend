import React from "react";
import { SkeletonLoader } from "@/components/loader/SkeletonLoader.jsx";
import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Pagination from "@/components/pagination/Pagination.jsx";
import PreviousButton from "@/components/button/PreviousButton.jsx";
import Aside from "@/components/sidebars/Aside.jsx";
const ContentSection = (
    {
        items,
        isFetching,
        isPending,
        isError,
        pagination,
        contentConfig,
        CardComponent,
        itemKeyExtractor,
        isBookmarked,
        emptyList= {
            heading: "No Results Match Current Settings!",
            message: "Review your filters by clicking the Add Filter button above.",
        },
        options = {
            showPrevBtn: false,
            showBackBtn: false,
            showItemsLimit: false,
            maxItems: 20
        },
        navUrl,
        isDetailed

    }) => {

    return (
        <section className={contentConfig?.styles?.section}>
            <div className="grid__container container margin-block-end-15" data-overflow="visible" data-type="full-bleed">
                <div className="grid__wrapper">
                    { options?.showPrevBtn && <div className="flex"><PreviousButton/></div>}
                    { (options?.showBackBtn || options?.showItemsLimit) &&
                        <div className="flex justify-space-between margin-block-end-4">
                            { options?.showBackBtn &&
                                (
                                    <Button className="btn--transparent margin-block-2" onClick={() => window.history.back()}>
                                        <FontAwesomeIcon icon={faChevronLeft} /> Back
                                    </Button>
                                )
                            }
                            { options?.showItemsLimit &&
                                (
                                    <div className="fs-small-300 fw-bold">
                                        <span>{items.length >= 0 ? items.length : 0}</span>
                                        <span> / </span>
                                        <span>{options?.maxItems}</span>
                                    </div>
                                )
                            }
                        </div>
                    }
                    <div className={(items.length > 0 || (isFetching || isPending)) && `grid__layout ${contentConfig?.styles?.grid || ''}`}>
                        <SkeletonLoader
                            isPending={isPending}
                            isFetching={isFetching}
                            isError={isError}
                            contentConfig={contentConfig}
                        >
                            {items.length > 0 ? (
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
                    {(items.length > 0 && pagination) &&
                        <Pagination
                            {...pagination}
                            isPending={isPending}
                            isFetching={isFetching}
                        />
                    }
                </div>
                <Aside/>
            </div>
        </section>
    );
};

export default ContentSection;