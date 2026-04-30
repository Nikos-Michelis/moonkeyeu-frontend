
const SkeletonNewsLoader = ({ sidebarCount = 3 }) => {
    return (
        <div className="news__container">
                <article className="news__item news__item--featured news__item--skeleton opacity-6">
                    <span className="skeleton skeleton--subtitle"></span>
                    <h3 className="skeleton skeleton--title"></h3>
                    <p className="skeleton skeleton--text"></p>
                    <span className="skeleton skeleton--text"></span>
                    <span className="skeleton skeleton--text"></span>
                    <span className="skeleton skeleton--text"></span>
                </article>

                <div className="news__sidebar">
                    {Array.from({ length: sidebarCount }).map((_, index) => (
                        <article key={index} className="news__item news__item--small news__item--skeleton opacity-6">
                            <span className="skeleton skeleton--text skeleton--subtitle"></span>
                            <h4 className="skeleton skeleton--title"></h4>
                            <div className="skeleton skeleton--text"></div>
                        </article>
                    ))}
                </div>
        </div>
    );
};

export default SkeletonNewsLoader;