import React, {createContext, useContext, useEffect, useState} from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState({});
    const [modalStatus, setModalStatus] = useState({});
    const [currentModalId, setCurrentModalId] = useState(null);

    const openModal = (modalId, modalData, modalType, triggerRef) => {
        setModals((prev) => {
            const isSameModalOpen = currentModalId === modalId && prev[modalId]?.isOpen;
            const newModals = {};

            if (isSameModalOpen) {
                setCurrentModalId(null);
                return newModals;
            }

            newModals[modalId] = {
                isOpen: true,
                data: modalData,
                type: modalType,
                ref: triggerRef
            };
            setCurrentModalId(modalId);

            return newModals;
        });
    };

    const removeModal = (modalId) => {
        setModals(prev => {
            const { [modalId]: _, ...rest } = prev;
            return rest;
        });
    };

    const closeModal = (modalId) => {
        setModals(prevState => ({...prevState, [modalId]: {...prevState[modalId], isOpen: false, data: null}}))
        if (currentModalId === modalId) {
            setCurrentModalId(null);
        }
    };

    const clearAllModals = () => {
        setModals({});
        setCurrentModalId(null);
    };

    const updateModalData = (modalId, value) => {
        setModals(prev => ({
            ...prev,
            [modalId]: {
                ...prev[modalId],
                data: {
                    ...prev[modalId]?.data,
                    ...value
                }
            }
        }));
    };


    return (
        <ModalContext.Provider value={{ modals, openModal, removeModal, closeModal, clearAllModals, updateModalData, currentModalId }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error("ModalContext must be used within ModalProvider");
    }
    return modalContext;
};

