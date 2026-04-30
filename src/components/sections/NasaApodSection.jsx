import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import {OverlayCard} from "@/components/cards/OverlayCard.jsx";
import {useNasaApod} from "@/context/NasaApodProvider.jsx";
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import useLuxonDateTime from "@/hooks/time/useLuxonDateTime.jsx";
import {SkeletonOverlayCard} from "@/components/skeleton/SkeletonOverlayCard.jsx";

const NasaApodSection = () => {
    const { data, isPending, isFetching, isError} = useNasaApod();
    const contentConfig = {
        component: SkeletonOverlayCard,
        count: 1,
        className: {
            content: "portrait-card--md",
            body: "portrait-card__container--overlay"
        },
        styles: {
            section: "news-articles",
        },
    };
    const { getZonedAndFormattedDateTime } = useLuxonDateTime();
   // const formattedZonedDateTime = getZonedAndFormattedDateTime(data?.date, 'MMMM dd, yyyy');

    return (
        <>
            <SectionHeading title="Astronomy Picture Of the Day"/>
            <div className="flex flex-column justify-center align-center">
                <SkeletonLoader
                    isPending={isPending}
                    isFetching={isFetching}
                    isError={isError}
                    contentConfig={contentConfig}>
                    {data ? (
                        <OverlayCard
                            className={{content: "portrait-card--md", body: "portrait-card__container--overlay"}}
                            imageSrc={data.url}
                            title={data.title}
                            description={data.explanation}
                        />
                    ) : (
                        <div>No image available at the moment.</div>
                    )
                    }
                </SkeletonLoader>
            </div>
        </>
    )
}

export default NasaApodSection