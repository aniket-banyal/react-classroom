import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';


function BasicModal({ children, open, setOpen, title }) {
    const handleClose = (e, reason) => {
        if (reason === "backdropClick")
            return
        setOpen(false)
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        {title}
                    </Box>

                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default BasicModal
