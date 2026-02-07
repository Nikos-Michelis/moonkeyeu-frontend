import React, {useCallback, useState} from "react";
import { LinkButton } from "@/components/button/LinkButton.jsx";
import {useDeleteMutation} from "@/services/mutations.jsx";
import Img from "@/components/utils/Img.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList  } from '@fortawesome/free-solid-svg-icons';
import toast from "react-hot-toast";
import BookmarkDropdown from "@/components/modal/dropdown/BookmarkDropdown.jsx";
import Modal from "@/components/modal/dialog/Modal.jsx";
import {EditBookmarkForm} from "@/components/modal/forms/EditBookmarkForm.jsx";

const BookmarkCard = ({ id, bookmark, launches }) => {
    const [open, setOpen] = useState(false);
    const bookmarkUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/user/bookmark/delete/`;
    const removeBookmarkMutation =
        useDeleteMutation({
            successMessage: undefined,
            queryKeysToInvalidate: ["user-bookmarks"]
        });

    const handleRemove = useCallback(async () => {
        await toast.promise(
            removeBookmarkMutation.mutateAsync(
                {
                    url: bookmarkUrl + bookmark,
                    options: { withCredentials: true, Bearer: true },
                }
            ),
            {
                loading: 'Removing bookmark...',
                success: <b>Bookmark removed!</b>,
                error: (err) => <b>{err.message || 'Could not remove bookmark.'}</b>,
            }
        );
    }, [bookmark]);

    return (
        <article className="bookmark-card container flex flex-column rounded-md" data-type="full-width" data-overflow="visible">
            <div className="container" data-spacing="none">
                <Img
                    src={launches?.[0]?.image?.image_url}
                    alt={launches?.[0]?.image?.image_url?.name || "default"}
                    className="bookmark-card__thumbnail"
                    defaultSrc={`${import.meta.env.VITE_CLOUDFRONT_URL}/assets/logo/moonkeyeu-logo.svg`}
                />
            </div>
            <div className="padding-2">
                <div className="flex justify-space-between align-center">
                    <h3 className="fs-small-300">{bookmark}</h3>
                    <BookmarkDropdown
                        handleRemove={handleRemove}
                        setOpen={() => setOpen(true)}
                    />
                    <Modal open={open} onOpenChange={setOpen}>
                        <Modal.Content title="Edit Bookmark">
                            <EditBookmarkForm
                                bookmark={bookmark}
                                img={launches?.[0]?.image?.image_url}
                                status={{
                                    isPending: removeBookmarkMutation.isPending,
                                    isSuccess: removeBookmarkMutation.isSuccess,
                                    isError: removeBookmarkMutation.isError
                                }}
                            />
                        </Modal.Content>
                    </Modal>
                </div>
                <div className="flex">
                    <LinkButton className="btn--transparent" to={bookmark}>
                        <p className="fs-small-200">
                            View full list of launches
                        </p>
                    </LinkButton>
                </div>
            </div>
            <div className="bookmark-card__count">
                <FontAwesomeIcon icon={faList} className="fa-xs" /> {launches?.length > 0 ? `${launches?.length} ${launches?.length > 1? "Launches": "Launch"}` : "Empty List"}
            </div>
        </article>
    );
};

export default BookmarkCard;