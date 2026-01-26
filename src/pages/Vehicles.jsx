import Heading from "@/components/utils/Heading.jsx";
import VehiclesSection from "@/components/sections/pages/VehiclesSection.jsx";
import Head from "@/components/seo/Head.jsx";
import React from "react";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import ContentLayout from "@/layout/ContentLayout.jsx";

function Vehicles() {
    return (
        <>
            <Head
                title="Vehicles"
                description="Explore the vehicles that shape space exploration, from historic milestones to today's cutting-edge technology."
            />
            <JsonLdGeneric
                type="CollectionPage"
                title="Vehicles"
                description="Explore the vehicles that shape space exploration, from historic milestones to today's cutting-edge technology."
            />
            <ContentLayout size="fit-content">
                <Heading
                    title="Spaceflight Vehicles"
                    description={
                        <>
                            Explore the vehicles that shape space exploration,
                            <br />
                            from historic milestones to today's cutting-edge technology.
                        </>
                    }
                />
                <VehiclesSection />
            </ContentLayout>
        </>
    );
}


export default Vehicles;
