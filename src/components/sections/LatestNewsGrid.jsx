const LatestNewsGrid = ({ data }) => {
    const { first, results } = data;
    return (
        <div className="news__container">
            {first &&
                <article className="news__item news__item--featured" style={{backgroundImage: `url(${first?.image_url})`}}>
                    <span className="badge--pill badge--gold">{first?.news_site}</span>
                    <h3 className="news__title">{first?.title}</h3>
                    <p className="news__excerpt">{first?.summary}</p>
                    <span className="news__date">{first?.published_at}</span>
                </article>
            }
            <div className="news__sidebar">
                {results?.length > 0 &&
                    results
                        .slice(1)
                        .map((article) => (
                            <article key={article.id} className="news__item news__item--small" style={{backgroundImage: `url(${article?.image_url})`}}>
                                <span className="badge--pill badge--mini badge--gold">{article?.news_site}</span>
                                <h4 className="news__title news__title--small">{article?.title}</h4>
                                <div className="news__date news__date--mini">{first?.published_at}</div>
                            </article>
                        ))
                }
            </div>
        </div>
    )
}

export default LatestNewsGrid;