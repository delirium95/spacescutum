import { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from "./context/ModalContext";
import {ModalKit} from "../shared/ui/modal/ModalKit";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode | null>(null);

    const openModal = (modalContent: ReactNode) => {
        setContent(modalContent);
    };
    const closeModal = () => {
        setContent(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {createPortal(
                <ModalKit content={content} closeModal={closeModal} />,
                document.body
            )}
        </ModalContext.Provider>
    );
};
