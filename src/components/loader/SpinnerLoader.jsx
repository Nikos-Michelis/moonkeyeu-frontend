import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const SpinnerLoader = ({ styles }) =>{
    return (
        <div className={`container ${styles?.container || ""} flex justify-center align-center fs-medium-900 ${styles?.color || "clr-neutral-1000"} padding-13`} data-type={styles?.type || ""} data-height={styles?.height || "half"}
             data-spacing="none">
            <div className="spinner-container" >
                <FontAwesomeIcon icon={faSpinner} spin />
            </div>
        </div>
    );
}
export default SpinnerLoader;