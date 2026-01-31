import React, {useCallback, useState} from 'react';
import CountdownTimer from "../timers/CountdownTimer.jsx";
import {DateTime} from "luxon";
import Tooltip from "@/components/tooltip/Tooltip.jsx";
import {Button} from "@/components/button/Button.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import useClipboard from "@/hooks/util/useClipboard.jsx";
import {useAuth} from "@/context/AuthProvider.jsx";
import {useParams} from "react-router-dom";
import useComparator from "@/hooks/util/useComparator.jsx";
import Img from "@/components/utils/Img.jsx";
import {useCreateMutation, useDeleteMutation} from "@/services/mutations.jsx";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShareFromSquare,
    faCircleCheck,
    faTriangleExclamation,
    faRocket,
    faCalendarDays,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {faXTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
import LaunchDropdown from "@/components/modal/dropdown/LaunchDropdown.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";
import {AddBookmarkForm} from "@/components/modal/forms/AddBookmarkForm.jsx";
import LoginForm from "@/components/modal/forms/LoginForm.jsx";
import {YouTubeEmbed} from "@/components/api/youtube-window/YouTubeEmbed.jsx";

const LaunchCard = ({ navUrl, id, agency, fullname, net, location, image, status:launchStatus, video_urls, isBookmarked = false, cardStyles }) => {
    const [open, setOpen] = useState(false);
    const zonedDateTime = DateTime.fromISO(net).setZone(DateTime.local().zoneName);
    const formattedZonedDateTime = zonedDateTime.toFormat('MMMM dd, yyyy - hh:mm a ZZZZ');
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const { name } = useParams();
    const { user, status } = useAuth();
    const youtubeVideos = video_urls?.filter(
        video => video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be")
    );
    const xVideos = video_urls?.filter(
        video => video.videoUrl.includes("x.com")
    );
    const item = useComparator(
        youtubeVideos?.length > 0 ? youtubeVideos : xVideos,
        (a, b) => a.priority > b.priority
    );
    const { copied, copyToClipboard } = useClipboard();
    const tooltipVideoMessage = item?.videoUrl ? "" : "No Video Available";
    const xTwitterUrl = "x.com";
    const handleShare = () => {
        const url = `${window.location.origin}${navUrl || window.location.pathname}/${id}`;
        copyToClipboard(url);
    };
    const removeLaunchMutation =
        useDeleteMutation({
            successMessage: undefined,
            queryKeysToInvalidate: ["my-launches", "user-bookmarks"]
        });

    const askAiMutation =
        useCreateMutation({
            successMessage: undefined,
            showError: false
        });

    const handleRemove = async () => {
        await toast.promise(
            removeLaunchMutation.mutateAsync(
                {
                    url: baseUrl + "/user/bookmark/delete/" + name + "/" + id,
                    options: { withCredentials: true, Bearer: true },
                }
            ),
            {
                loading: 'Removing launch...',
                success: <b>Launch removed!</b>,
                error: (err) => <b>{err.response?.data?.error || 'Could not remove launch.'}</b>,
            }
        );
    };

    const onBookmark = useCallback(() => {
        setOpen(true);
        !user &&
        toast(
            "You're almost there! Sign up or log in to bookmark your favorites launches.",
            { icon: <FontAwesomeIcon icon={faRocket} /> }
        );
    }, [user]);

    return (
        <article className={`landscape-card flex justify-center ${cardStyles?.wrapper || 'large-wrapper'}`}>
            <div className={`landscape-card__container lift lift--lg ${cardStyles?.card_type || ''}`}>
                    <LinkButton to={navUrl? navUrl + id: id} className="landscape-card__media landscape-card__media--link">
                        <Img
                            src={image?.image_url}
                            alt={image?.name || "default"}
                            className="landscape-card__image"
                            defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                        />
                    </LinkButton>
                <section className="landscape-card__content flex flex-column justify-space-between">
                    <div className="landscape-card__details">
                        <div className="flex justify-space-between align-center">
                            <h3 className="fs-small-300">{fullname}</h3>
                            <LaunchDropdown
                                isBookmarked={isBookmarked}
                                status={status}
                                onBookmark={onBookmark}
                                onRemove={handleRemove}
                                onShare={handleShare}
                                copied={copied}
                            />
                            <Modal open={open} onOpenChange={setOpen}>
                                <Modal.Content title={user && "Bookmark to..."}>
                                    {user
                                        ? <AddBookmarkForm launchId={id} status={status} />
                                        : <LoginForm />
                                    }
                                </Modal.Content>
                            </Modal>
                        </div>
                        <div className="landscape-card__detail-box">
                            <p><small className="fw-semi-bold">{agency}</small></p>
                        </div>
                        <div className="landscape-card__detail-box">
                            <div>
                                {launchStatus === 'Launch Successful' || launchStatus === 'Go for Launch' ? (
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                ) : (
                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                )}
                            </div>
                            <p className="fw-regular"><small>{launchStatus}</small></p>
                        </div>
                        <div className="landscape-card__detail-box margin-block-1">
                            <div>
                                <FontAwesomeIcon icon={faCalendarDays} />
                            </div>
                            <p className="fw-regular"><small>{formattedZonedDateTime}</small></p>
                        </div>
                        {location &&
                            <div className="landscape-card__detail-box launch-location">
                                <div>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </div>
                                <p className="fw-regular"><small>{location?.name}</small></p>
                            </div>
                        }
                        { zonedDateTime > Date.now() && (
                            <CountdownTimer net={zonedDateTime} timerStyle="margin-block-3" />
                        ) }
                    </div>
                    <div className="landscape-card__actions padding-block-start-6 padding-block-end-8" data-type="narrow">
                        {item ? (
                            item?.source?.includes(xTwitterUrl) ? (
                                <div className="landscape-card__video">
                                    <LinkButton
                                        to={item.videoUrl}
                                        isExternal={true}
                                        className="btn btn--Xtwitter"
                                    >
                                        <FontAwesomeIcon icon={faXTwitter}/> WATCH
                                    </LinkButton>
                                </div>
                            ) : (
                                <div className="landscape-card__video">
                                    <Modal>
                                        <Modal.Button
                                            className="btn btn--yt"
                                        >
                                            <FontAwesomeIcon icon={faYoutube}/> WATCH
                                        </Modal.Button>
                                        <Modal.Content classNames={{content: 'dialog__container--youtube'}}>
                                            <div className="modal-content">
                                                <YouTubeEmbed videoUrl={item.videoUrl} />
                                            </div>
                                        </Modal.Content>
                                    </Modal>
                                </div>
                            )
                        ) : (
                            <Tooltip>
                                <Tooltip.Button asChild>
                                    <div className="landscape-card__video">
                                        <Button className="btn btn--yt" disabled={true}>
                                            <FontAwesomeIcon icon={faYoutube} /> WATCH
                                        </Button>
                                    </div>
                                </Tooltip.Button>
                                <Tooltip.Content>{tooltipVideoMessage}</Tooltip.Content>
                            </Tooltip>
                        )}
                    </div>
                </section>
            </div>
        </article>
    );
};

export default LaunchCard;
