import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

function SkeletonBookmarkLoader(){

    return(
    <div className="bookmark-card container flex flex-column rounded-md" data-type="full-width">
        <div className="card-img-box skeleton skeleton--img opacity-6">
            <div className="bookmark-card__thumbnail">
                <div className="bookmark-card__icon flex justify-center align-center">
                    <FontAwesomeIcon icon={faImage} className="fs-big-600" />
                </div>
            </div>
        </div>
        <div className="padding-2">
            <div className="skeleton skeleton--text opacity-6"></div>
            <div className="skeleton skeleton--subtitle opacity-6"></div>
        </div>
    </div>
    )
}
export default SkeletonBookmarkLoader;