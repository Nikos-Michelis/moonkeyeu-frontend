import React from 'react';
import {VehicleOptionCard} from "@/components/cards/VehicleOptionCard.jsx";
import BuyMeACoffee from "@/components/button/BuyMeACoffee.jsx";
import LatestNews from "@/components/sidebars/LatestNews.jsx";
import SkeletonPortraitLoader from "@/components/skeleton/SkeletonPortraitLoader.jsx";
import AstronautCard from "@/components/cards/AstronautCard.jsx";
import ContentSection from "@/layout/ContentSection.jsx";

const sections = [
    {
        id: 1,
        title: "Rockets",
        description: "Discover the rockets that have carried us beyond Earth—from our first steps into space to today’s era of advanced, reusable technology.",
        linkText: "View Rockets",
        sectionImage: `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/vehicles/falcon252092520full2520thrust_image_20190222031117.jpeg`,
        navigation:"/vehicles/rockets"
    },
    {
        id: 2,
        title: "Spacecraft Stages",
        description: "Although reaching orbit is a significant achievement, the true challenge lies in safeguarding crew members in the vastness of space. " +
            "From the era of the Moon race to today, we have developed and flown numerous crewed spacecraft, ranging from small capsules to large spaceplanes. " +
            "The possibilities of human innovation in space continue to expand, pushing the frontier of exploration further than ever before.",
        linkText: "View Spacecraft",
        sectionImage: `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/vehicles/starship_image_20231116184708.jpeg`,
        navigation:"/vehicles/spacecraft"
    },
    {
        id: 3,
        title: "Rocket Boosters",
        description: "We closely monitor the progress of every reusable boosters in the industry, from the pioneers like SpaceX and Blue Origin to emerging players." +
            " Each launch is thoroughly documented, providing a comprehensive record of reusable rocket technology and its ongoing evolution for everyone to access.",
        linkText: "View Boosters",
        sectionImage: `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/vehicles/85_image_20221102112709.jpeg`,
        navigation:"/vehicles/launchers",
    },

    {
        id: 4,
        title: "Space Stations",
        description: "The Soviet Union launched the first space station, Salyut 1, on April 19, 1971. Since then, advancements in technology and scientific research in orbit have transformed our capabilities. " +
            "Future space stations could extend across the Solar System, pushing the boundaries of exploration beyond what past generations ever envisioned.",
        linkText: "Coming Soon...",
        sectionImage: `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/vehicles/spacestation.jpg`,
        navigation:"/vehicles/launchers",
        disable: true
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
            CardComponent={VehicleOptionCard}
        />
    )
};

export default VehiclesSection;