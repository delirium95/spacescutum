import { Box, Modal } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface ModalPropsKit {
    content: ReactNode | null;
    closeModal: () => void;
}

export const ModalKit: FC<ModalPropsKit> = ({ content, closeModal }) => {
    return (
        <Modal open={!!content} onClose={closeModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    minWidth: 300,
                }}
            >
                {content}
            </Box>
        </Modal>
    );
};
