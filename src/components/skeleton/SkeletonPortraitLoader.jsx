import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
const SkeletonPortraitLoader = () => {
    return (
        <article className="portrait-card portrait-card__container">
                <div className="skeleton skeleton--media opacity-6">
                    <div className="skeleton--container">
                        <div className="skeleton--container__icon">
                            <FontAwesomeIcon icon={faImage} />
                        </div>
                    </div>
                </div>
                <div className="skeleton--skeleton-container">
                    <div className="skeleton skeleton--text opacity-6"></div>
                    <div className="skeleton skeleton--text opacity-6"></div>
                    <div className="skeleton skeleton--text opacity-6"></div>
                    <div className="margin-block-start-4">
                        <div className="skeleton skeleton--text opacity-6"></div>
                    </div>
                </div>
        </article>
    );
};

export default SkeletonPortraitLoader;
