import React from "react";
import Heading from "../components/utils/heading/Heading.jsx";
import { useSimpleQuery } from "@/services/queries.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import AgenciesSection from "@/components/sections/pages/AgenciesSection.jsx";
import ContentLayout from "@/layout/ContentLayout.jsx";

function Agencies() {
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/agencies`;

    const queryData
        = useSimpleQuery({
            url: `${baseUrl}`,
            cacheKey: "agencies",
        });
    return (
        <>
            <Head
                title="Agencies"
                description="Explore key space agencies that have shaped space exploration."
            />
            <JsonLdGeneric
                type="CollectionPage"
                title="Agencies"
                description="Explore key space agencies that have shaped space exploration."
            />
            <ContentLayout>
                <Heading
                    title="Agencies"
                    description="Explore key space agencies that have shaped space exploration."
                />
                <AgenciesSection
                    agencies={queryData.data || {}}
                    isPending={queryData.isPending}
                    isFetching={queryData.isFetching}
                    isError={queryData.isError}
                />
            </ContentLayout>
        </>
    );
}

export default Agencies;
