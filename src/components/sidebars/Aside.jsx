import BuyMeACoffee from "@/components/button/BuyMeACoffee.jsx";
import StarshipCard from "@/components/cards/StarshipCard.jsx";
import LatestNews from "@/components/sidebars/LatestNews.jsx";
import React from "react";

const Aside = () => {
    return (
        <aside>
            <BuyMeACoffee />
            <StarshipCard/>
            <LatestNews />
        </aside>
    )
}

export default Aside;