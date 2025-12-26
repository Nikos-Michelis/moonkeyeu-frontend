import React from "react";

function Heading({ title, description }) {
    return (
        <div className="container heading" data-type="full-bleed">
            <h1 className="heading__title clr-star-300">{title}</h1>
            <p className="heading__text clr-star-300">{description}</p>
        </div>
    );
}

export default Heading;
