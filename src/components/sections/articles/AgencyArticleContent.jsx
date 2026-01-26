import {Button} from "@/components/button/Button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAlignLeft, faChevronLeft, faCircleInfo, faShareFromSquare} from "@fortawesome/free-solid-svg-icons";
import Img from "@/components/utils/Img.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import Tooltip from "@/components/tooltip/Tooltip.jsx";
import UpcomingLaunch from "@/components/article-details/UpcomingLaunch.jsx";
import RocketConfig from "@/components/article-details/RocketConfig.jsx";
import SpacecraftConfig from "@/components/article-details/SpacecraftConfig.jsx";
import React from "react";
import useClipboard from "@/hooks/util/useClipboard.jsx";
import useDataFormatter from "@/hooks/util/useDataFormatter.jsx";

const AgencyArticleContent = ({queryData, pagination}) => {
    const { copied, copyToClipboard } = useClipboard();
    const { handleValue } = useDataFormatter();
    const agenciesData = queryData?.agenciesQuery?.data;
    const country = agenciesData?.country || [];
    const handleShare = () => {
        copyToClipboard(window.location.href)
    };
    return (
          <>
              <div className="container flex justify-start padding-block-start-7 padding-block-end-2">
                  <Button className="btn--transparent" onClick={() => window.history.back()}>
                      <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </Button>
              </div>
              <div className="container article__overview flex flex-column justify-center align-center" data-type="full-bleed">
                  <div className="article__image-box">
                      <Img
                          src={agenciesData?.images?.[0]?.image_url}
                          alt={agenciesData?.images?.[0]?.name || "default"}
                          className="article__image article__image--scale-down"
                          defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                      />
                  </div>
                  <div className="container flex flex-column justify-center padding-2">
                      <div className="panel">
                          <h3 className="panel__title text-center">{agenciesData?.name}</h3>
                          <hr/>
                          <div className="panel__wrapper">
                              <div className="panel__container">
                                  <div className="panel__detail-box fs-small-200 padding-1">
                                      <p className="panel__text">Type</p>
                                      <p className="panel__text">{agenciesData?.type}</p>
                                  </div>
                                  <div className="panel__detail-box fs-small-200 padding-1">
                                      <p className="panel__text">Country</p>
                                      <p className="panel__text">{country?.[0]?.alpha_3_code}</p>
                                  </div>
                              </div>
                              <div className="panel__container">
                                  <div className="panel__detail-box fs-small-200 padding-1">
                                      <p className="panel__text">Spacecraft</p>
                                      <p className="panel__text">{handleValue(agenciesData?.Spacecraft)}</p>
                                  </div>
                                  <div className="panel__detail-box fs-small-200 padding-1">
                                      <p className="panel__text">Launchers</p>
                                      <p className="panel__text">{handleValue(agenciesData?.Launchers)}</p>
                                  </div>
                              </div>
                              <div className="panel__container">
                                  <div className="panel__detail-box fs-small-200 padding-1">
                                      <p className="panel__text">Administrator</p>
                                      <p className="panel__text">{handleValue(agenciesData?.administrator)}</p>
                                  </div>
                              </div>
                          </div>
                          <hr/>
                      </div>
                      <div className="container flex justify-space-evenly align-center padding-block-2" data-type="full-bleed" data-overflow="visible">
                          { agenciesData?.info_url ? (
                              <div className="info">
                                  <LinkButton
                                      className="btn--transparent btn-instragram"
                                      to={agenciesData?.info_url}
                                      isExternal={true}
                                  >
                                      <FontAwesomeIcon icon={faCircleInfo} />
                                  </LinkButton>
                              </div>
                          ) : (
                              <Tooltip message="No Info Available">
                                  <div className="info">
                                      <LinkButton
                                          className="btn--transparent btn-wikipedia"
                                          isExternal={true}
                                          disabled={true}
                                      >
                                          <FontAwesomeIcon icon={faCircleInfo} />
                                      </LinkButton>
                                  </div>
                              </Tooltip>
                          )}
                          <div>
                              <Tooltip message={copied ? "Copied!" :"Copied to clipboard!"}>
                                  <Button className="btn--transparent" onClick={handleShare} disabled={copied}>
                                      <FontAwesomeIcon icon={faShareFromSquare} />
                                  </Button>
                              </Tooltip>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="article__info-container container flex flex-column" data-type="full-bleed">
                  { agenciesData?.description &&
                      <section className="agency-section">
                          <div className="article__heading-box">
                              <FontAwesomeIcon icon={faAlignLeft} />
                              <h2>Agency Description</h2>
                          </div>
                          <hr className="hr-100-sm" />
                          <div className="article__info-box">
                              <p>{agenciesData?.description}</p>
                          </div>
                      </section>
                  }
                  { agenciesData?.upcoming_launch && <UpcomingLaunch launch={agenciesData?.upcoming_launch}/>}
                  <RocketConfig
                      queryData={queryData?.rocketConfigQuery}
                      pagination={pagination}
                  />
                  { agenciesData?.spacecraft_configurations?.length > 0 &&
                      <SpacecraftConfig
                          spacecraftConfigs={agenciesData?.spacecraft_configurations}
                      />
                  }
                  <div className="padding-block-end-4">
                      <hr className="hr-90-md"/>
                  </div>
              </div>
          </>
    );
}

export default AgencyArticleContent;