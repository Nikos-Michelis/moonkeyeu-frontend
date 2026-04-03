import Hero from "@/layout/Hero.jsx";
import ContentContainer from "@/layout/ContentContainer.jsx";
import moonBackground from "/artemis.jpeg"
import nasaAstronomy from "/astronomy.jpg"
import falcon from "/falcon.png"
import sojuz from "/sojuz.webp"
import {OverlayCard} from "@/components/cards/OverlayCard.jsx";
import UpcomingLaunchesSection from "@/components/sections/UpcomingLaunchesSection.jsx";
import LatestNewsSections from "@/components/sections/LatestNewsSections.jsx";
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import QuickLinksSection from "@/components/sections/QuickLinksSection.jsx";
import {faBuilding, faClipboardList, faLocationDot, faShuttleSpace} from "@fortawesome/free-solid-svg-icons";
import {faSpaceAwesome} from "@fortawesome/free-brands-svg-icons";

const Home = () => {
    const launchData = [
        {
            id: 1,
            title: "SLS | Artemis II",
            image: moonBackground, // Using your imported variable
            description: "Artemis II is the first crewed mission as part of the Artemis program. It will send a crew of 4—3 Americans and 1 Canadian—around the moon and return them safely to Earth.",
            net: '2026-08-01'
        },
        {
            id: 2,
            title: "Starship | HLS",
            image: falcon,
            description: "The Human Landing System (HLS) is designed to land the first woman and next man on the lunar surface, marking a new era of deep space exploration and sustainability.",
            net: '2026-08-01'

        },
        {
            id: 3,
            title: "Falcon Heavy | Gateway",
            image: sojuz,
            description: "Launching the foundational elements of the Lunar Gateway, this mission provides the essential power and propulsion needed for a permanent human presence in lunar orbit.",
            net: '2026-08-01'
        }
    ];

    const linksData = [
        {
            id: 1,
            title: "Upcoming Launches",
            description: "Next missions scheduled worldwide. Filters for rocket, agency, orbit & more.",
            image: moonBackground,
            link: '',
            icon: faSpaceAwesome,
            arrow: true
        },
        {
            id: 2,
            title: "Agencies",
            description: "NASA, SpaceX, ESA, Roscosmos, CNSA and every active space agency tracked.",
            image: moonBackground,
            link: '',
            icon: faBuilding,
            arrow: true

        },
        {
            id: 3,
            title: "Launch Locations",
            description: "Every spaceport on Earth — Cape Canaveral, Baikonur, Vandenberg & beyond.",
            image: moonBackground,
            link: '',
            icon: faLocationDot,
            arrow: true

        },
        {
            id: 4,
            title: "Programs",
            description: "Artemis, ISS, Starlink, Galileo — all major space programs and their missions.",
            image: moonBackground,
            link: '',
            icon: faClipboardList,
            arrow: true

        },

        {
            id: 5,
            title: "Vehicles",
            description: "Falcon 9, Starship, Ariane 6, Soyuz, Long March — full specs and history.",
            image: moonBackground,
            link: '',
            icon: faShuttleSpace,
            arrow: true
        },
    ]
    const firstLaunch = launchData?.length > 0 ? launchData[0] : []


    return (
        <>
            <Hero/>
            <ContentContainer size="wide">
                <div className="margin-block-12">
                    <SectionHeading title="Quick Access"/>
                    <QuickLinksSection links={linksData} />
                </div>
                <div className="margin-block-12">
                    <SectionHeading title="Next Upcoming Launch" linkText="ALL Launches"/>
                    <div className="flex justify-center">
                        <OverlayCard
                            className={{content: "portrait-card--md", body: "portrait-card__container--overlay"}}
                            imageSrc={moonBackground}
                            title={firstLaunch.title} description="Artemis II is the first crewed mission as part of the Artemis program. Artemis II will send a crew of 4 - 3 Americans and 1 Canadian around the moon and return them back to Earth. The mission will test the core systems of NASA's Orion spacecraft including the critical life support system, among other systems which could not be tested during Artemis I due to the lack of crew onboard."
                            net="2026-08-01"
                        />
                    </div>
                </div>
                <div className="margin-block-12">
                    <SectionHeading title="Upcoming Launches" linkText="ALL Launches"/>
                    <UpcomingLaunchesSection launches={launchData}/>
                </div>
                <div className="margin-block-12">
                    <SectionHeading title="Astronomy Picture Of the Day"/>
                    <div className="flex justify-center">
                        <OverlayCard
                            className={{content: "portrait-card--md", body: "portrait-card__container--overlay"}}
                            imageSrc={nasaAstronomy}
                            title="SLS | Artemis II" description="Artemis II is the first crewed mission as part of the Artemis program. Artemis II will send a crew of 4 - 3 Americans and 1 Canadian around the moon and return them back to Earth. The mission will test the core systems of NASA's Orion spacecraft including the critical life support system, among other systems which could not be tested during Artemis I due to the lack of crew onboard."
                        />
                    </div>
                </div>
                <div className="margin-block-12">
                    <LatestNewsSections />
                </div>
            </ContentContainer>
        </>

    );
}
export default Home;