import { createContext, type ReactNode } from 'react';

type ModalContextType = {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);
