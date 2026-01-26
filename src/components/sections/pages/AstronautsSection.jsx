import React from 'react';
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import SkeletonPortraitLoader from "@/components/skeleton/SkeletonPortraitLoader.jsx";
import BuyMeACoffee from "@/components/button/BuyMeACoffee.jsx";
import Pagination from "@/components/pagination/Pagination.jsx";
import AstronautCard from "@/components/cards/AstronautCard.jsx";
import LatestNews from "@/components/sidebars/LatestNews.jsx";

const AstronautsSection = ({astronauts, isPending, isFetching, isError, pagination}) => {
    const contentConfig = {
        component: SkeletonPortraitLoader,
    };
    const items = astronauts._embedded?.astronautNormalDTOes || [];
    const emptyList= {
        heading: "No Results Match Current Settings!",
        message: "Review your filters by clicking the Add Filter button above.",
    }
    return (
        <section className="astronauts-section">
            <div className="grid__container container margin-block-end-15" data-overflow="visible" data-type="full-bleed">
                <div className="grid__wrapper">
                    <div className={`${items.length > 0 || (isFetching || isPending) ? "grid__layout" : ""}`}>
                        <SkeletonLoader
                            isFetching={isFetching}
                            isPending={isPending}
                            isError={isError}
                            contentConfig={contentConfig}>
                             {items.length > 0 ? (
                                 items.map(astronaut => (
                                    <AstronautCard key={astronaut?.id} {...astronaut} />
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
                <aside>
                    <BuyMeACoffee />
                    <LatestNews />
                </aside>
            </div>
        </section>
    );
};

export default AstronautsSection;