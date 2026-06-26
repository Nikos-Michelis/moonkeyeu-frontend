import { motion } from "framer-motion";
import Hero from "@/layout/Hero.jsx";
import ContentContainer from "@/layout/ContentContainer.jsx";
import QuickLinksSection from "@/components/sections/QuickLinksSection.jsx";
import {faSpaceAwesome} from "@fortawesome/free-brands-svg-icons";
import {faBuilding, faClipboardList, faLocationDot, faShuttleSpace} from "@fortawesome/free-solid-svg-icons";
import UpcomingLaunchesSection from "@/components/sections/UpcomingLaunchesSection.jsx";
import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import LatestNewsSections from "@/components/sections/LatestNewsSection.jsx";
import NasaApodSection from "@/components/sections/NasaApodSection.jsx";
import LaunchesHistorySection from "@/components/sections/LaunchesHistorySection.jsx";
import NextUpcomingLaunchSection from "@/components/sections/NextUpcomingLaunchSection.jsx";

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

function Home() {
    const linksData = [

        {

            id: 1,

            title: "Upcoming Launches",

            description: "Next missions scheduled worldwide. Filters for rocket, agency, orbit & more.",

            link: '',

            icon: faSpaceAwesome,

            arrow: true

        },

        {

            id: 2,

            title: "Agencies",

            description: "NASA, SpaceX, ESA, Roscosmos, CNSA and every active space agency tracked.",

            link: '',

            icon: faBuilding,

            arrow: true



        },

        {

            id: 3,

            title: "Launch Locations",

            description: "Every spaceport on Earth — Cape Canaveral, Baikonur, Vandenberg & beyond.",

            link: '',

            icon: faLocationDot,

            arrow: true



        },

        {

            id: 4,

            title: "Programs",

            description: "Artemis, ISS, Starlink, Galileo — all major space programs and their missions.",

            link: '',

            icon: faClipboardList,

            arrow: true



        },



        {

            id: 5,

            title: "Vehicles",

            description: "Falcon 9, Starship, Ariane 6, Soyuz, Long March — full specs and history.",

            link: '',

            icon: faShuttleSpace,

            arrow: true

        },

    ]

    return (
        <>
            <Hero/>
            <ContentContainer size="wide">
                <motion.div
                    className="margin-block-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <SectionHeading title="Quick Access"/>
                    <QuickLinksSection links={linksData} />
                </motion.div>

                <motion.div
                    className="margin-block-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                   <NextUpcomingLaunchSection/>
                </motion.div>

                <motion.div
                    className="margin-block-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <SectionHeading title="Upcoming Launches" linkText="ALL Launches"/>
                    <UpcomingLaunchesSection/>
                </motion.div>

                <motion.div
                    className="margin-block-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <NasaApodSection/>
                </motion.div>

                <motion.div
                    className="margin-block-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <SectionHeading title="This Day in History"/>
                    <LaunchesHistorySection/>

                </motion.div>

                <motion.div
                    className="margin-block-12"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <LatestNewsSections />
                </motion.div>
            </ContentContainer>
        </>
    )
}

export default Home;