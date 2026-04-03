import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import {LinkButton} from "@/components/button/LinkButton.jsx";
import CountdownTimer from "@/components/timers/CountdownTimer.jsx";

const HeroCarousel = ({ slides }) => {
    const [emblaRef] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 5000 })]
    )
    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {slides.map((slide) => (
                    <div className="embla__slide" key={slide.id}>
                        <div className="embla__content">
                            <div style={{ backgroundImage: `url(${slide.bg})` }} className="hero__background"/>
                            <div className="hero__scanlines"/>
                            <div className="hero__overview">
                                <div className="hero__col">
                                    { slide?.type === "launch" &&
                                        <CountdownTimer
                                            net={slide.date}
                                            classNames={{number: "hero__countdown"}}
                                            labels={false}
                                            showMonths={false}
                                        />
                                    }
                                    { slide?.type === "astronomy" &&
                                        <h3 className="hero__title">
                                            <span className="hero__title--astronomy">PICTURE OF THE DAY</span>
                                        </h3>
                                    }
                                    <div className="flex">
                                        <div className="badge--pill badge--primary">{slide.mission}</div>
                                        <div className="badge--pill badge--primary">{slide.rocket}</div>
                                        { slide?.type === "launch" &&
                                            <div className={`badge--pill badge--${slide.status === 'Go for Launch' ? `success` : 'warning'}`}>{slide.status}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="hero__content">
                                <h1 className="hero__title">
                                    <span className="hero__title--outline">THE</span>
                                    <span className="hero__title--accent">COSMIC</span>
                                    <span className="hero__title--outline">NEWS</span>
                                </h1>

                                <p className="hero__description">
                                    Stay up to date with upcoming and past spaceflights
                                    <br />
                                    from NASA, SpaceX, and other leading space
                                    <br />
                                    agencies around the world.
                                </p>
                                <div className="hero__navigation">
                                    <LinkButton to="/launches?page=1&limit=12&upcoming=true" className="btn btn--primary">
                                        UPCOMING LAUNCHES
                                    </LinkButton>
                                    <LinkButton to="/news?limit=12&offset=0&ordering=-published_at" className="btn btn--primary">
                                        LATEST NEWS
                                    </LinkButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HeroCarousel;