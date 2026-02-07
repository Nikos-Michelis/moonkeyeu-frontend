import React, {useState} from "react";
import {Button} from "@/components/button/Button.jsx";
import ScrollToTop from "@/components/utils/ScrollToTop.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import {useAuth} from "@/context/AuthProvider.jsx";
import {useHasRole} from "@/hooks/rbac/useHasRole.jsx";
import {useNavigate} from "react-router-dom";
import {DateTime} from "luxon";
import {useDeleteMutation} from "@/services/mutations.jsx";
import Head from "@/components/seo/Head.jsx";
import JsonLdGeneric from "@/components/seo/jsonld/JsonLdGeneric.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faChevronLeft, faSpinner, faTableColumns, faDoorOpen, faPenToSquare, faGear, faEraser } from '@fortawesome/free-solid-svg-icons';
import AlertModal from "@/components/modal/dialog/AlertModal.jsx";
import DataList from "@/components/utils/DataList.jsx";
import useLuxonDateTime from "@/hooks/time/useLuxonDateTime.jsx";

const Profile = () =>{
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const [open, setOpen] = useState(false);
    const { logout, invalidateCredentials, user, status } = useAuth();
    const navigate = useNavigate();
    const { hasRole } = useHasRole();
    const roles = ["DEVELOPER", "ADMIN", "MODERATOR"]
    const alertMessage = [
        "This action is permanent.",
        "This action cannot be reversed.",
        "Your data will be deleted, including your bookmarks and other related data."
    ]

    const deleteAccount =
        useDeleteMutation({
            successMessage: "You have successfully deleted your account. Your data will be permanently removed within 30 days.",
        });

    const handleDeleteAccount = () => {
        deleteAccount.mutate(
            {
                url: baseUrl + "/user/account/deactivate",
                data: null,
                options: { withCredentials: true, Bearer: true }
            },
            {
                onSuccess: () => {
                    invalidateCredentials();
                    setOpen(false);
                    navigate("/launches");
                },
            }
        )
    };

    const { getZonedAndFormattedDateTime } = useLuxonDateTime();
    const formattedZonedDateTime = getZonedAndFormattedDateTime(user?.createdAt, 'MMMM dd, yyyy');

    return(
        <>
            <Head
                title="Profile"
                description="View and edit your profile information."
            />
            <JsonLdGeneric
                title="Profile"
                description="View and edit your profile information."
            />
            <ScrollToTop behavior="auto" />
            <section className="profile">
                <div className="container flex justify-center" data-height="auto" data-type="medium" data-spacing="none">
                    <div className="container padding-inline-8 padding-block-10" data-type="fixed-inherit" data-spacing="none">
                        <div className="container flex justify-start padding-block-end-4">
                            <Button className="btn--transparent" onClick={() => window.history.back()}>
                                <FontAwesomeIcon icon={faChevronLeft} /> Back
                            </Button>
                        </div>
                        <div className="profile__user-icon margin-block-end-8">
                            <FontAwesomeIcon icon={faUserAstronaut} className="fa-user-astronaut" />
                        </div>
                        <div className="container flex flex-column" data-spacing="none" data-overflow="visible">
                            <section className="profile__managment">
                                <div className="flex align-center margin-block-2">
                                    <FontAwesomeIcon icon={faGear} className="fs-small-700" />
                                    <h2 className="margin-inline-2">Account Management</h2>
                                </div>
                                <div className="panel panel--shadow">
                                    <div className="panel__wrapper">
                                        <div className="panel__container">
                                            <div className="panel__detail-box fs-small-200 padding-2">
                                                <p className="panel__text">Username</p>
                                                <p className="panel__text">{user?.username}</p>
                                            </div>
                                            <div className="panel__detail-box fs-small-200 padding-2">
                                                <p className="panel__text">Email</p>
                                                <p className="panel__text">{user?.email}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="panel__container">
                                            <div className="panel__detail-box fs-small-200 padding-2">
                                                <p className="panel__text">Role</p>
                                                <p className="panel__text">{user?.role?.[0]}</p>
                                            </div>
                                            <div className="panel__detail-box fs-small-200 padding-2">
                                                <p className="panel__text">Member Since</p>
                                                <p className="panel__text">{formattedZonedDateTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container flex flex-wrap justify-center align-center padding-block-8" data-type="full-bleed">
                                    <div className="container flex flex-wrap justify-center">
                                        {hasRole(roles) && (
                                            <LinkButton
                                                className="btn btn--primary btn--big-hg margin-2"
                                                to="/dashboard">
                                                <FontAwesomeIcon icon={faTableColumns} /> Dashboard
                                            </LinkButton>
                                        )}
                                        <LinkButton
                                            className="btn btn--primary btn--big-hg margin-2"
                                            to="change-password">
                                            <FontAwesomeIcon icon={faPenToSquare} /> Change Password
                                        </LinkButton>
                                        <Button
                                            className="btn btn--primary btn--big-hg margin-2"
                                            onClick={() => logout()}
                                        >
                                            { status.isPending
                                                ? <FontAwesomeIcon icon={faSpinner} spin />
                                                : <FontAwesomeIcon icon={faDoorOpen} />
                                            } Logout
                                        </Button>
                                        <AlertModal open={open} onOpenChange={setOpen}>
                                            <AlertModal.Button className="btn btn--primary btn--big-hg btn--warning margin-2">
                                                <FontAwesomeIcon icon={faEraser}/> Delete Account
                                            </AlertModal.Button>
                                            <AlertModal.Content
                                                classNames={{title: "padding-4"}}
                                                title="Delete Account - Are you sure?"
                                                okText="Yes, delete account"
                                                onOk={() => handleDeleteAccount()}
                                                status={deleteAccount}
                                            >
                                                <DataList data={alertMessage}/>
                                            </AlertModal.Content>
                                        </AlertModal>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <hr className="hr-90-sm"/>
                    </div>
                </div>
            </section>
        </>
    );

}
export default Profile;