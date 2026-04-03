import {LinkButton} from "@/components/button/LinkButton.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from "@/components/timers/CountdownTimer.jsx";

export const OverlayCard = (
    {
        className= {},
        icon= null,
        disable,
        title,
        description,
        imageSrc,
        link,
        arrow = false,
        net,
    }) => {
    return (
        <>
            <LinkButton to={link} className={`portrait-card ${className?.content}`}>
                <div className="flex flex-column justify-center">
                    <div className={`portrait-card__container ${className?.body}`} style={{backgroundImage: `url(${imageSrc})`}}>
                        <h3 className="portrait-card__title margin-block-2">{ icon && <FontAwesomeIcon size="xl" icon={icon}/>} {title}</h3>
                        <p className="portrait-card__text">{description}</p>
                        {arrow &&
                            <div className="portrait-card__arrow">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </div>
                        }
                        {net &&
                            <div className="margin-block-8">
                                <CountdownTimer net={net}/>
                            </div>
                        }
                    </div>
                </div>
            </LinkButton>
        </>
    );
};
