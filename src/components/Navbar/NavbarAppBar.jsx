import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserIconMenu from './UserIconMenu';
import NavbarMenu from './NavbarMenu';


function NavbarAppBar({ toggleDrawer, drawerOpen }) {

    return (
        <>
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

                    <NavbarMenu />
                    <UserIconMenu />
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default NavbarAppBar
