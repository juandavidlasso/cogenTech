import React from 'react';
import { Snackbar, AlertProps } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AlertModal = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Alert: React.FC<Props> = ({
    message,
    type,
    isOpen,
    setIsOpen,
}) => {
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <AlertModal
                onClose={handleClose}
                severity={type}
                sx={{ width: '100%' }}
            >
                {message}
            </AlertModal>
        </Snackbar>
    );
};

export default Alert;
