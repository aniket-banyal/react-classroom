import { GoogleLogout } from 'react-google-login'
import { useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TemporaryDrawer from './TemporaryDrawer';
import { useState } from 'react';


function Navbar() {
    const navigate = useNavigate()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { isAuth, setIsAuth } = useAuth()
    const { user } = useUser()

    const toggleDrawer = () => { setDrawerOpen(!drawerOpen) }

    const onGoogleLogoutSuccess = (res) => {
        setIsAuth(false)
        localStorage.setItem('is_auth', false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div>
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

                    {isAuth &&
                        <div style={{ display: 'flex' }} >
                            {user && <p> {user.name} ({user.email}) </p>}

                            <GoogleLogout
                                clientId='411542087259-8ets43a5n6tu5qkmrfnauep52kh9uij0.apps.googleusercontent.com'
                                buttonText="Logout"
                                onLogoutSuccess={onGoogleLogoutSuccess}
                            >
                            </GoogleLogout>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Toolbar />

            <TemporaryDrawer toggleDrawer={toggleDrawer} open={drawerOpen} />
        </div>
    )

}

export default Navbar
