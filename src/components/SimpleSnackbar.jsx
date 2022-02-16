import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { Alert } from '@mui/material';

function SimpleSnackbar({ message, open, setOpen }) {
    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'right',
    })
    const { vertical, horizontal } = state

    const handleClose = (event, reason) => { setOpen(false) }


    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            anchorOrigin={{ vertical, horizontal }}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SimpleSnackbar
