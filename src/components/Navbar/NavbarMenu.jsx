import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import JoinClassroom from './JoinClassroom';
import CreateClassroom from './CreateClassroom';
import BasicModal from "../shared/BasicModal";

function NavbarMenu() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [joining, setJoining] = useState(false)
    const [creating, setCreating] = useState(false)

    const handleClose = () => setAnchorEl(null)
    const handleMenu = event => setAnchorEl(event.currentTarget)

    const handleJoinClass = () => {
        setJoining(true)
        handleClose()
    }

    const handleCreateClass = () => {
        setCreating(true)
        handleClose()
    }


    return (
        <>
            <BasicModal
                open={joining}
                setOpen={setJoining}
                title='Join Classroom'
            >
                <JoinClassroom onSubmit={() => setJoining(false)} />
            </BasicModal>

            <BasicModal
                open={creating}
                setOpen={setCreating}
                title='Create Classroom'
            >
                <CreateClassroom onSubmit={() => setCreating(false)} />
            </BasicModal>


            <IconButton
                disableFocusRipple
                size="large"
                onClick={handleMenu}
            >
                <AddIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleJoinClass}>Join Class</MenuItem>
                <MenuItem onClick={handleCreateClass}>Create Class</MenuItem>
            </Menu>
        </>
    )
}

export default NavbarMenu
