import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';


const ITEM_HEIGHT = 48;

function ThreeDotMenu({ options }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => setAnchorEl(null)

    const handleOptionClick = onClick => {
        onClick()
        handleClose()
    }

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map(option => (
                    <MenuItem key={option.name} onClick={() => handleOptionClick(option.onClick)}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default ThreeDotMenu
