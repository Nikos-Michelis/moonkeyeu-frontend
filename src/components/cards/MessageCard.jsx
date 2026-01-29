import React, {useCallback, useState} from 'react';
import {useDeleteMutation} from "@/services/mutations.jsx";
import toast from "react-hot-toast";
import {DateTime} from "luxon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import AlertModal from "@/components/modal/dialog/AlertModal.jsx";
import DataList from "@/components/utils/DataList.jsx";

const MessageCard = ({id, category, email, message, created_at}) => {
    const [open, setOpen] = useState(false);
    const zonedDateTime = DateTime.fromISO(created_at).setZone(DateTime.local().zoneName);
    const formattedZonedDateTime = zonedDateTime.toFormat('MMMM dd, yyyy - hh:mm a');
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/contact/messages`;
    const alertMessage = ["This action is permanent.", "This action cannot be reversed.",];
    const removeMessageMutation =
        useDeleteMutation({
            queryKeysToInvalidate: ["contact-messages"],
            mutationOptions: {
                onSuccess: () => {
                    setOpen(false);
                    toast.success("Message successfully deleted!");
                },
            },
        });

    const handleRemove = useCallback(() => {
        removeMessageMutation.mutate(
            {
                url: `${baseUrl}/delete/${id}`,
                options: { withCredentials: true, Bearer: true },
            }
        );
    }, [id]);

    return (
        <article className="landscape-card flex justify-center small-wrapper">
            <div className="landscape-card__container">
                <section className="landscape-card__content flex flex-column justify-space-evenly">
                    <div className="panel">
                        <h4 className="panel__title">{category}</h4>
                        <hr/>
                        <div className="panel__wrapper">
                            <div className="panel__container">
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">Email</p>
                                    <p className="panel__text">{email}</p>
                                </div>
                                <div className="panel__detail-box fs-medium-200 padding-1">
                                    <p className="panel__text">CreatedAt</p>
                                    <p className="panel__text">{formattedZonedDateTime}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="panel__container padding-1">
                                <div className="panel__detail-box fs-medium-200 padding-2"
                                     data-spacing="none"
                                     data-scroll={message.length> 2  ? "vertical" : undefined}>
                                    <p className="panel__text padding-block-2">{message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="landscape-card__actions flex flex-wrap justify-center padding-block-2">
                        <AlertModal open={open} onOpenChange={setOpen}>
                            <AlertModal.Button className="btn btn--primary btn--warning">
                                <FontAwesomeIcon icon={faTrash}/> Delete Message
                            </AlertModal.Button>
                            <AlertModal.Content
                                classNames={{title: "padding-4"}}
                                title="Delete Account - Are you sure?"
                                okText="Yes, delete message"
                                onOk={() => handleRemove()}
                                status={removeMessageMutation}
                            >
                                <DataList data={alertMessage}/>
                            </AlertModal.Content>
                        </AlertModal>
                    </div>
                </section>
            </div>
        </article>
    );
};

export default MessageCard;
