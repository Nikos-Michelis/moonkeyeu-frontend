import {LinkButton} from "@/components/button/LinkButton.jsx";

const VIDEO_URL = `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/video/hero-video.mp4`;
const VIDEO_THUMBNAIL = `${import.meta.env.VITE_CLOUDFRONT_URL}/assets/video/thumbnail.png`;

const Hero = () => {
    return (
            <div className="hero">
                <div className="hero__container">
                    <video
                        src={VIDEO_URL}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="hero__video"
                        preload="auto"
                        poster={VIDEO_THUMBNAIL}
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="hero__scanlines"/>
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
    );
}

export default Hero;