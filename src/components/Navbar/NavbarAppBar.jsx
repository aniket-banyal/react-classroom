import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserIconMenu from './UserIconMenu';
import NavbarMenu from './NavbarMenu';
import useClassroom from '../../hooks/api/useClassroom';
import { Link as RouterLink, useParams } from 'react-router-dom';


function NavbarAppBar({ toggleDrawer, drawerOpen }) {
    const { code } = useParams()
    const { data: classroom, } = useClassroom(code)

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

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {code ?
                            <Link
                                underline="hover"
                                component={RouterLink}
                                to={`/${code}/dashboard`}
                                color='inherit'
                            >
                                {classroom?.name}
                            </Link>
                            :
                            'Classroom'
                        }
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
