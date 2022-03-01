import { Dialog, DialogContent, DialogTitle } from '@mui/material';

function BasicModal({ children, open, setOpen, title }) {
    const handleClose = () => setOpen(false)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default BasicModal
