import {OverlayCard} from "@/components/cards/OverlayCard.jsx";

const QuickLinksSection = ({ links }) => {
    return (
        <div className={`grid__layout`}>
                {links.length > 0 &&
                    links.map((item) => (
                        <OverlayCard
                            key={item.id}
                            className={{content: "portrait-card--sm", body: "portrait-card__container--small portrait-card__container--space-evenly padding-4"}}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                            arrow={item.arrow}
                        />
                    ))
                }
        </div>
    );
}

export default QuickLinksSection;