import React from "react";
import NewsArticle from "@/components/cards/NewsArticle.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileCircleXmark, faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {SkeletonLoader} from "@/components/loader/SkeletonLoader.jsx";
import SkeletonLandscapeLoader from "@/components/skeleton/SkeletonLandscapeLoader.jsx";

const RelatedNews = ({ queryData }) =>{
    const articles = queryData?.data?.results;
    const contentConfig = {
        component: SkeletonLandscapeLoader,
        count: 4,
        scroll: 2,
        styles: {
            wrapper: "article-card--small-wrapper",
            section: "launches-articles",
            card_type: "landscape-card__container--article-card"
        },
    };
    return(
        <section className="related-news-section">
            <div className="article__heading-box">
                <FontAwesomeIcon icon={faNewspaper} />
                <h2>Related News</h2>
            </div>
            <hr className="hr-100-sm" />
            <div className="flex justify-center align-center padding-block-8">
                <div className="container"
                     data-type="full-width"
                     data-spacing="none"
                     data-scroll={articles?.length > contentConfig?.scroll ? "vertical" : undefined}
                >
                    <div className="margin-block-5 margin-inline-4">
                        <div className="grid__layout grid__layout--landscape padding-block-2">
                            <SkeletonLoader
                                isPending={queryData?.isPending}
                                isFetching={queryData?.isFetching}
                                isError={queryData?.isError}
                                contentConfig={contentConfig}
                            >
                                {articles?.length > 0 ? (
                                    articles.map(article =>
                                        <NewsArticle
                                            key={article.id} {...article}
                                            cardStyles={contentConfig?.styles}
                                            soLaunchBtn={false}
                                        />
                                    )
                                ) : (
                                    <div className="padding-8 text-center clr-neutral-1000">
                                        <FontAwesomeIcon icon={faFileCircleXmark} className="fs-large-700 margin-block-end-6"/>
                                        <p>News is not available. Check back for updates.</p>
                                    </div>
                                )}
                            </SkeletonLoader>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default RelatedNews;