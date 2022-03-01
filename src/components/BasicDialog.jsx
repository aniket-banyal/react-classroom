import { AppBar, Button, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import CloseIcon from '@mui/icons-material/Close'


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function BasicDialog({ children, open, setOpen, title, action }) {
    const handleClose = () => setOpen(false)

    const handleClick = () => {
        action.run()
        handleClose()
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography sx={{ ml: 2, flex: 1 }}>
                        {title}
                    </Typography>

                    <Button color="inherit" onClick={handleClick}>
                        {action.name}
                    </Button>
                </Toolbar>
            </AppBar>
            <Toolbar />


            <DialogContent>
                {children}
            </DialogContent>
        </Dialog >
    )
}

export default BasicDialog
