import React from "react";
import ChatModal from "@/components/modal/chat/ChatModal.jsx";
import {useChatBot} from "@/context/ChatBotProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/button/Button.jsx";
import ChatForm from "@/components/modal/chat/ChatForm.jsx";
import CustomScrollArea from "@/components/utils/CustomScrollArea.jsx";
import {LinkButton} from "@/components/button/LinkButton.jsx";
import { BotMessageSquare } from 'lucide-react';

const ChatBot = () => {
    const {open, setOpen, chatHistory, setChatHistory} = useChatBot();

    return (
        <>
            <Button
                className="btn--chatbot"
                onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={open? faXmark : faCommentDots} className="btn__icon"/>
            </Button>
            <ChatModal open={open} onOpenChange={setOpen}>
                <ChatModal.Content title="CosmicBot">
                    <CustomScrollArea>
                        <div className={`chat__body ${!chatHistory.length > 0 && "chat__body--center"}`}>
                            {
                                chatHistory.length > 0 ?
                                    chatHistory?.map((chat) => (
                                        <div className="message message--bot">
                                            <BotMessageSquare className="message__avatar" />
                                            <LinkButton
                                                to={`/launches/${chat?.data?.id}`}
                                                className={`message__text`}
                                            >
                                                   <h3 className="fs-small-200">{chat?.data?.fullname}</h3>
                                                   <p>
                                                       {chat?.data?.message}
                                                   </p>
                                                   <div className="flex justify-end fs-small-100 fw-bold margin-block-start-4">
                                                       <p>{chat?.data?.lastUpdated}</p>
                                                   </div>
                                               </LinkButton>
                                           </div>
                                       )) :
                                       (
                                           <div className="message__empty">
                                               <p>Oοps! your chat history is empty...</p>
                                           </div>
                                       )
                            }
                        </div>
                    </CustomScrollArea>
                    <div className="chat__footer">
                        <ChatForm setChatHistory={setChatHistory}/>
                    </div>
                </ChatModal.Content>
            </ChatModal>
        </>
    );
}

export default ChatBot;