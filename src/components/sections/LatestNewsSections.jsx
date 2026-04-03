import SectionHeading from "@/components/utils/heading/SectionHeading.jsx";
import {useSpaceFlightNews} from "@/context/SpaceFlightNewsProvider.jsx";

const LatestNewsSections = () => {
    const { data, isPending, isFetching, isError } = useSpaceFlightNews();
    const first = data?.results?.length > 0 ? data?.results[0] : []

    return (
        <section className="news-section">
            <SectionHeading title="Latest News"  linkText="ALL NEWS"/>
            <div className="news__grid">
                {first &&
                    <article className="news__item news__item--featured" style={{backgroundImage: `url(${first?.image_url})`}}>
                        <span className="news__tag">{first?.news_site}</span>
                        <h3 className="news__title">{first?.title}</h3>
                        <p className="news__excerpt">{first?.summary}</p>
                        <span className="news__date">{first?.published_at}</span>
                    </article>
                }
                <div className="news__sidebar">
                    {data?.results?.length > 0 &&
                        data.results
                            .slice(1)
                            .map((article) => (
                            <article className="news__item news__item--small"  style={{backgroundImage: `url(${article?.image_url})`}}>
                                <span className="news__tag news__tag--mini">{article?.news_site}</span>
                                <h4 className="news__title news__title--small">{article?.title}</h4>
                                <div className="news__date news__date--mini">{first?.published_at}</div>
                            </article>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestNewsSections;