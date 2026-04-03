import SkeletonPortraitLoader from "@/components/skeleton/SkeletonPortraitLoader.jsx";
import {OverlayCard} from "@/components/cards/OverlayCard.jsx";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";

const UpcomingLaunchesSection = ({launches, isPending, isFetching, isError, pagination}) => {
    const contentConfig = {
        component: SkeletonPortraitLoader,
        styles: {
            section: "astronauts-section",
        },
    };

    const emptyList = {
        heading: "No Results Match Current Settings!",
        message: "Review your filters by clicking the Add Filter button above.",
    }

    //const items = astronauts._embedded?.astronautNormalDTOes || [];

    return (
        <div className={`grid__layout grid__layout--col-3`}>
            <SkeletonLoader
                isPending={isPending}
                isFetching={isFetching}
                isError={isError}
                contentConfig={contentConfig}
            >
                {launches.length > 0 ? (
                    launches.map((item) => (
                        <OverlayCard
                            key={item.id}
                            className={{content: "portrait-card--sm", body: "portrait-card__container--overlay"}}
                            imageSrc={item.image}
                            title={item.title}
                            description={item.description}
                            net={item.net}
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
    );
}
export default UpcomingLaunchesSection