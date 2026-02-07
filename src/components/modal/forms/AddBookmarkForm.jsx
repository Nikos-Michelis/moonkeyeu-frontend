import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@/components/button/Button.jsx";
import {useForm} from "react-hook-form";
import {useAuth} from "@/context/AuthProvider.jsx";
import {useDebounce} from "@/hooks/util/useDebounce.jsx";
import ErrorBox from "@/components/utils/ErrorBox.jsx";
import Input from "@/components/utils/fields/Input.jsx";
import {useNavigate} from "react-router-dom";
import {useCreateMutation, useDeleteMutation} from "@/services/mutations.jsx";
import {useSimpleQuery} from "@/services/queries.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleUp,
    faAngleDown,
    faEye,
    faSpinner,
    faArrowRight, faFileCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import CustomScrollArea from "@/components/utils/CustomScrollArea.jsx";
import CustomCheckbox from "@/components/utils/CustomCheckbox.jsx";
import SpinnerLoader from "@/components/loader/SpinnerLoader.jsx";
import toast from "react-hot-toast";

export function AddBookmarkForm({launchId}) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false)
    const [bookmark, setBookmark] = useState(null)
    const debouncedValue = useDebounce(bookmark, 500);
    const [apiError, setApiError] = useState(null);
    const {user} = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}} = useForm({ mode: 'onChange' });

    const queryData = useSimpleQuery({
        url: baseUrl + "/user/user-bookmarks",
        cacheKey: "user-bookmarks",
        queryOptions: {
            enabled: !!user,
            retry: 2
        },
        options: { withCredentials: false, Bearer: true }
    })

    const createBookmarkMutation =
        useCreateMutation({
            successMessage: "Bookmark created successfully!",
            queryKeysToInvalidate: ["user-bookmarks"],
            retry: 1
        });

    const addToBookmarkMutation =
        useCreateMutation({
            queryKeysToInvalidate: ["user-bookmarks", "my-launches"],
            retry: 1
        });

    const removeLaunchMutation =
        useDeleteMutation({
            queryKeysToInvalidate: ["user-bookmarks", "my-launches"],
            retry: 1
        });

    const handleAddToBookmark = async (data) => {
        await toast.promise(
            addToBookmarkMutation.mutateAsync({
                data: data,
                url: baseUrl + "/user/bookmark/add",
                options: { withCredentials: true, Bearer: true }
            }, {
                onSuccess: () => {
                    reset();
                },
                onError: (error) => {
                    setApiError(error.response?.data);
                },
            }),
            {
                loading: 'Adding launch to your bookmark...',
                success: <b>Launch added successfully!</b>,
                error: (err) => <b>{err.message || 'Oops! Something went wrong.'}</b>,
            }
        )
    };

    const handleRemoveFromBookmark = async (data) => {
        await toast.promise(
            removeLaunchMutation.mutateAsync({
                url: baseUrl + `/user/bookmark/delete/${data.bookmark}/${data.launchId}`,
                options: { withCredentials: true, Bearer: true }
            }),
            {
                loading: 'Removing launch from your bookmark...',
                success: <b>Launch removed successfully!</b>,
                error: (err) => <b>{err.message || 'Oops! Something went wrong.'}</b>,
            }
        );
    };

    const onSubmit = (data) => {
        createBookmarkMutation.mutate(
            {
                data: data,
                url: baseUrl + "/user/bookmark/create",
                options: { withCredentials: true, Bearer: true }
            },
            {
                onSuccess: () => {
                    reset();
                },
                onError: (error) => {
                    setApiError(error.response?.data);
                },
            }
        );
    };

    const handleBookmarkChange = (e) => {
        const { name, checked } = e.target;
        setBookmark((prevBookmark) => ({
            ...prevBookmark,
            name: name,
            checked: checked
        }));
    };

    const handleOnNavigate = (url) => {
        navigate(url);
    }

    useEffect(() => {
        if (addToBookmarkMutation.isPending || removeLaunchMutation.isPending) {
            return;
        }

        if (debouncedValue?.name) {
            if (debouncedValue?.checked) {
                void handleAddToBookmark({ bookmarkName: debouncedValue.name, launchId: launchId });
            } else {
                void handleRemoveFromBookmark({ bookmark: debouncedValue.name, launchId: launchId });
            }
        }
    }, [debouncedValue, launchId]);

    return(
        <>
            <div className="dialog__content padding-8">
                <CustomScrollArea>
                    <div className="padding-inline-2">
                        {queryData.isPending && <SpinnerLoader/>}
                        {!queryData.isPending && queryData.data?.length > 0 && (
                            queryData.data.map(bookmark => (
                                <div className="flex justify-space-between align-center margin-block-1 margin-inline-4" key={bookmark.id}>
                                    <CustomCheckbox
                                        id={bookmark?.id}
                                        name={bookmark?.bookmark}
                                        value={bookmark?.bookmark}
                                        defaultChecked={bookmark?.launches?.some(launch => launch.id === launchId) ?? false}
                                        onCheckedChange={(checked) => handleBookmarkChange({
                                            target: {
                                                name: bookmark.bookmark,
                                                value: bookmark.bookmark,
                                                checked: checked
                                            }
                                        })
                                        }
                                        disabled={addToBookmarkMutation.isPending || removeLaunchMutation.isPending}
                                    />
                                    <p className="margin-inline-8 fw-regular ellipsis-single-md fs-small-200">{bookmark?.bookmark}</p>
                                    <Button className="btn btn--transparent" onClick={() => handleOnNavigate(`/bookmarks/${bookmark?.bookmark}`)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                </div>
                            ))
                        )}

                        {!queryData.isPending && (!queryData.data || queryData.data.length === 0) && (
                            <div className="padding-8 text-center clr-neutral-1000">
                                <FontAwesomeIcon icon={faFileCircleXmark} className="fs-large-700 margin-block-end-6"/>
                                <p>There are no bookmarks yet, create a new bookmark</p>
                            </div>
                        )}
                    </div>
                </CustomScrollArea>
                <div className="flex flex-wrap justify-center margin-block-4">
                    <Button onClick={() => setToggle(!toggle)}
                            className="btn--transparent btn--big--transparent">
                        {toggle ? (
                            <FontAwesomeIcon icon={faAngleUp} />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown} />
                        )}
                    </Button>
                </div>
                <div className={`form-content height-fade ${ toggle ? "show md" : ""} padding-0`}>
                    <h2>Add Bookmark</h2>
                    {(errors && Object.keys(errors).length > 0 || apiError?.validationErrors)
                        && <ErrorBox errors={errors} apiError={apiError}/>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-field">
                            <Input
                                className={`${errors.email ? 'input-error' : ''}`}
                                label="Bookmark Name"
                                name="bookmarkName"
                                type="text"
                                register={register}
                                rules={{
                                    required: 'Bookmark Name is required.',
                                    min:{ value: 1, message:'Book mark name should be at least 1 character.'},
                                    max:{ value: 155, message:'Book mark name should be 155 characters max.'}
                                }}
                                errors={errors}
                                disabled={createBookmarkMutation.isPending || addToBookmarkMutation.isPending || removeLaunchMutation.isPending}/>
                        </div>
                        <div className="flex flex-wrap justify-center padding-2">
                            <Button
                                className="btn btn--primary btn--big"
                                type="submit"
                                disabled={createBookmarkMutation.isPending || addToBookmarkMutation.isPending || removeLaunchMutation.isPending}
                            >
                                { createBookmarkMutation.isPending
                                    ? <FontAwesomeIcon icon={faSpinner} spin />
                                    : <FontAwesomeIcon icon={faArrowRight} />
                                } Continue
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}