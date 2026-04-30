import ContentSection from "@/layout/ContentSection.jsx";
import {OverlayCard} from "@/components/cards/OverlayCard.jsx";

const sections = [
    {
        id: 1,
        title: "Rockets",
        description: "Discover the rockets that have carried us beyond Earth—from our first steps into space to today’s era of advanced, reusable technology.",
        linkText: "View Rockets",
        imageSrc: `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/vehicles/falcon252092520full2520thrust_image_20190222031117.jpeg`,
        navigation:"/vehicles/rockets",
        className:{content: "portrait-card--sm", body: "portrait-card__container--overlay"}
    },
    {
        id: 2,
        title: "Spacecraft Stages",
        description: "Although reaching orbit is a significant achievement, the true challenge lies in safeguarding crew members in the vastness of space. " +
            "From the era of the Moon race to today, we have developed and flown numerous crewed spacecraft, ranging from small capsules to large spaceplanes. " +
            "The possibilities of human innovation in space continue to expand, pushing the frontier of exploration further than ever before.",
        linkText: "View Spacecraft",
        imageSrc: `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/vehicles/starship_image_20231116184708.jpeg`,
        navigation:"/vehicles/spacecraft",
        className:{content: "portrait-card--sm", body: "portrait-card__container--overlay"}
    },
    {
        id: 3,
        title: "Rocket Boosters",
        description: "We closely monitor the progress of every reusable boosters in the industry, from the pioneers like SpaceX and Blue Origin to emerging players." +
            " Each launch is thoroughly documented, providing a comprehensive record of reusable rocket technology and its ongoing evolution for everyone to access.",
        linkText: "View Boosters",
        imageSrc: `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/vehicles/85_image_20221102112709.jpeg`,
        navigation:"/vehicles/launchers",
        className:{content: "portrait-card--sm", body: "portrait-card__container--overlay"}
    },

    {
        id: 4,
        title: "Space Stations",
        description: "The Soviet Union launched the first space station, Salyut 1, on April 19, 1971. Since then, advancements in technology and scientific research in orbit have transformed our capabilities. " +
            "Future space stations could extend across the Solar System, pushing the boundaries of exploration beyond what past generations ever envisioned.",
        linkText: "Coming Soon...",
        imageSrc: `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/vehicles/spacestation.jpg`,
        navigation:"/vehicles/launchers",
        disable: true,
        className:{content: "portrait-card--sm", body: "portrait-card__container--overlay"}
    },
];

const VehiclesSection = () => {
    const contentConfig = {
        styles: {
            section: "vehicles-section",
            grid: "grid__layout--vehicle"
        },
    };

    return (
        <ContentSection
            itemKeyExtractor={(item) => item.id}
            items={sections || {}}
            contentConfig={contentConfig}
            CardComponent={OverlayCard}
        />
    )
};

export default VehiclesSection;