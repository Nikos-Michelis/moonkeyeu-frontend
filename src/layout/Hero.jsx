import moonBackground from "/artemis.jpeg"
import astronomyBackground from "/astronomy.jpg"
import HeroCarousel from "@/components/sliders/HeroCarousel.jsx";

const slides = [
    {
        id: 1,
        bg: moonBackground,
        mission: "NASA",
        rocket: "Vega-C | SMILE",
        date: "2027-06-01",
        status: "TBD",
        type: "launch"
    },
    {
        id: 2,
        bg: astronomyBackground,
        mission: "NASA",
        rocket: "Uranus's Largest Moon: Titania",
        date: "2026-02-10",
        type: "astronomy"
    },
    {
        id: 3,
        bg: moonBackground,
        mission: "ESA",
        rocket: "Ariane 6 | JUICE",
        date: "2026-09-18",
        status: "Go for Launch",
        type: "launch"
    }
]

const Hero = () => {

    return (
        <section className="hero">
            <HeroCarousel slides={slides}/>
        </section>
    )
}

export default Hero