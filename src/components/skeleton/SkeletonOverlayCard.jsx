export const SkeletonOverlayCard = ({ className = {}, showArrow = false, showTimer = false }) => {
    console.log(className)
    return (
        <div className={`portrait-card portrait-card--skeleton ${className?.content || ''}`}>
            <div className="flex flex-column justify-center align-center">
                <div className={`portrait-card__container portrait-card__container--align-center`}>
                    <div className="skeleton skeleton--title skeleton--sm"></div>
                    <div className="skeleton skeleton--text skeleton--lg"></div>
                    <div className="skeleton skeleton--text skeleton--lg"></div>
                    <div className="skeleton skeleton--subtitle skeleton--sm"></div>
                    {showTimer && (
                        <div className="skeleton skeleton--text margin-block-8" style={{ width: '40%', height: '2rem' }}></div>
                    )}
                </div>
            </div>
        </div>
    );
};