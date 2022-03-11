import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import JoinClassroom from '../JoinClassroom';
import CreateClassroom from '../CreateClassroom';
import BasicModal from "../BasicModal"
import UserIconMenu from './UserIconMenu';


function NavbarAppBar({ toggleDrawer, drawerOpen }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [joining, setJoining] = useState(false)
    const [creating, setCreating] = useState(false)

    const handleClose = () => setAnchorEl(null)

    const handleJoinClass = () => {
        setJoining(true)
        handleClose()
    }

    const handleCreateClass = () => {
        setCreating(true)
        handleClose()
    }


    const handleMenu = event => setAnchorEl(event.currentTarget)


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


            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Classroom
                    </Typography>

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

                    <UserIconMenu />

                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default NavbarAppBar
