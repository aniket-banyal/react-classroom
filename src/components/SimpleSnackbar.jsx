import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

function SimpleSnackbar({ message, open, setOpen, action }) {
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
            anchorOrigin={{ vertical, horizontal }}
            onClose={handleClose}
            message={message}
            action={action}
        />
    )
}

export default SimpleSnackbar
