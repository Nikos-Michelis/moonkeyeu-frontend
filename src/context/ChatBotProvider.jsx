import {createContext, useContext, useState} from "react";

export const ChatBotContext = createContext({});

export const ChatBotProvider = ({ children }) => {
    const [open, setOpen] = useState()
    const [chatHistory, setChatHistory] = useState([]);

    const providerValues =  ({ chatHistory, setChatHistory, open, setOpen});

    return (
        <ChatBotContext.Provider value={providerValues}>
            {children}
        </ChatBotContext.Provider>
    )
}

export const useChatBot = () => {
    const chatBotContext = useContext(ChatBotContext);
    if (!chatBotContext) {
        throw new Error("ChatBotContext must be used within ChatBotProvider");
    }
    return chatBotContext;
};
