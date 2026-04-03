function PageHeading({ title, description }) {
    return (
        <section className="heading-section">
            <div>
                <div className="container page-heading" data-type="full-bleed">
                    <h1 className="page-heading__title">{title}</h1>
                    <p className="page-heading__text">{description}</p>
                </div>
            </div>
        </section>
    );
}

export default PageHeading;
