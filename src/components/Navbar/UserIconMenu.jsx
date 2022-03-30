import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import NameAvatar from '../NameAvatar';
import LogoutButton from "../LogoutButton";
import useUser from '../../hooks/api/useUser';
import { IconButton, Menu, MenuItem } from '@mui/material';


function UserIconMenu() {
    const [accountAnchorEl, setAccountAnchorEl] = useState(null)
    const { isAuth } = useAuth()
    const { data: user, isLoading } = useUser()

    const handleAccountMenu = event => setAccountAnchorEl(event.currentTarget)
    const handleAccountMenuClose = () => setAccountAnchorEl(null)


    if (isLoading) {
        return null
    }

    return (
        <>
            {
                isAuth && user &&
                <IconButton
                    size='small'
                    onClick={handleAccountMenu}
                >
                    <NameAvatar
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
                    <LogoutButton />
                </MenuItem>
            </Menu>
        </>
    )
}

export default UserIconMenu
