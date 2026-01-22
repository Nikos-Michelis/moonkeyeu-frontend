import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
function SkeletonArticleLoader(){
    return(
        <>
            <section className="article">
                <div className="container flex justify-center" data-type="wide" data-spacing="none">
                    <div className="container article__content flex flex-column align-center" data-type="medium">
                            <div className="container flex justify-start padding-block-start-7 padding-block-end-2">
                                <div className="skeleton skeleton--btn opacity-6"></div>
                            </div>
                             <div className="container article__overview flex flex-column justify-center align-center" data-type="full-bleed">
                                <div className="article__image-box skeleton opacity-6">
                                    <div className="skeleton--container skeleton--container--article">
                                        <div className="skeleton--container__icon skeleton-launch">
                                            <FontAwesomeIcon icon={faImage} />
                                        </div>
                                    </div>
                                </div>
                                <div className="container flex flex-column justify-center padding-2" data-type="full-bleed">
                                    <h1 className="skeleton skeleton--title opacity-6"></h1>
                                    <div className="panel">
                                        <hr/>
                                        <div className="panel__wrapper">
                                            <div className="panel__container">
                                                <div className="skeleton skeleton--title opacity-6"></div>
                                                <div className="skeleton skeleton--title opacity-6"></div>
                                            </div>
                                            <div className="panel__container">
                                                <div className="skeleton skeleton--title opacity-6"></div>
                                                <div className="skeleton skeleton--title opacity-6"></div>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                    <div className="skeleton skeleton--heading"></div>
                                </div>
                            </div>
                            <div className="article__info-container container skeleton--skeleton--container flex flex-column" data-type="full-bleed">
                                <section>
                                    <div className="article__heading-box skeleton skeleton--heading opacity-4"></div>
                                    <hr className="hr-100-sm" />
                                    <div className="article__info-box article__info-box--col">
                                        <p className="skeleton skeleton--title opacity-6"></p>
                                        <p className="skeleton skeleton--heading opacity-6"></p>
                                        <p className="skeleton skeleton--text opacity-6"></p>
                                    </div>
                                </section>
                                <section>
                                    <div className="article__heading-box skeleton skeleton--heading opacity-4"></div>
                                    <hr className="hr-100-sm" />
                                    <div className="article__info-box">
                                        <p className="skeleton skeleton--title opacity-6"></p>
                                        <p className="skeleton skeleton--heading opacity-6"></p>
                                        <p className="skeleton skeleton--text opacity-6"></p>
                                    </div>
                                </section>
                                <section>
                                    <div className="article__heading-box skeleton skeleton--heading opacity-4"></div>
                                    <hr className="hr-100-sm" />
                                    <div className="article__info-box">
                                        <p className="skeleton skeleton--title opacity-6"></p>
                                        <p className="skeleton skeleton--heading opacity-6"></p>
                                        <p className="skeleton skeleton--text opacity-6"></p>
                                    </div>
                                </section>
                            </div>
                        </div>
                </div>
            </section>
        </>
    )
}
export default SkeletonArticleLoader;
