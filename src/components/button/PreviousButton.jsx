import React from "react";
import { Button } from "@/components/button/Button.jsx";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

const PreviousButton = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const upcoming = searchParams.get("upcoming");
    const handleLaunchState = () => {
        const isUpcoming = upcoming === "true";
        searchParams.set("upcoming", (!isUpcoming).toString());
        searchParams.set("page", 1);
        setSearchParams(searchParams, { replace: true });
    };
    return (
        <Button className="btn btn--primary rotation margin-block-end-4" onClick={handleLaunchState}>
            <div className="prev__content">
                <FontAwesomeIcon icon={faClockRotateLeft} />
                <p className="prev__title">{upcoming === "true" ? "Previous" : "Upcoming"}</p>
            </div>
        </Button>
    );
};

export default PreviousButton;
