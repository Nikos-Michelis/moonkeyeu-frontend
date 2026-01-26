import React from "react";

function Heading({ title, description }) {
    return (
        <section className="heading-section">
            <div>
                <div className="container heading" data-type="full-bleed">
                    <h1 className="heading__title">{title}</h1>
                    <p className="heading__text">{description}</p>
                </div>
            </div>
        </section>
    );
}

export default Heading;
