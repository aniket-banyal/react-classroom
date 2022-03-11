import { GoogleLogout } from 'react-google-login'
import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/api/useUser'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from './TemporaryDrawer';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import JoinClassroom from './JoinClassroom';
import CreateClassroom from './CreateClassroom';
import BasicModal from "./BasicModal"
import UserAvatar from './UserAvatar';
import { useQueryClient } from 'react-query';


function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [accountAnchorEl, setAccountAnchorEl] = useState(null)
    const [joining, setJoining] = useState(false)
    const [creating, setCreating] = useState(false)
    const navigate = useNavigate()
    const { isAuth, setIsAuth } = useAuth()
    const { data: user } = useUser()
    const queryClient = useQueryClient()

    const toggleDrawer = () => { setDrawerOpen(!drawerOpen) }

    const onGoogleLogoutSuccess = (res) => {
        setIsAuth(false)

        localStorage.setItem('is_auth', false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')

        queryClient.removeQueries()

        navigate('/login')
    }

    const handleMenu = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const handleAccountMenu = event => setAccountAnchorEl(event.currentTarget)
    const handleAccountMenuClose = () => setAccountAnchorEl(null)

    const handleJoinClass = () => {
        setJoining(true)
        handleClose()
    }

    const handleCreateClass = () => {
        setCreating(true)
        handleClose()
    }


    return (
        <div>
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

                    {isAuth && user &&
                        <IconButton
                            size='small'
                            onClick={handleAccountMenu}
                        >
                            <UserAvatar
                                size='small'
                                name={user.name}
                            />
                        </IconButton>
                    }

                    <Menu
                        anchorEl={accountAnchorEl}
                        keepMounted
                        open={Boolean(accountAnchorEl)}
                        onClose={handleAccountMenuClose}
                    >
                        <MenuItem onClick={handleAccountMenuClose}>
                            <GoogleLogout
                                clientId='411542087259-8ets43a5n6tu5qkmrfnauep52kh9uij0.apps.googleusercontent.com'
                                buttonText="Logout"
                                onLogoutSuccess={onGoogleLogoutSuccess}
                            >
                            </GoogleLogout>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <TemporaryDrawer toggleDrawer={toggleDrawer} open={drawerOpen} />
        </div>
    )

}

export default Navbar
