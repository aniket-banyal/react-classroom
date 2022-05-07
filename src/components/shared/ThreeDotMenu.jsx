import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';


function ThreeDotMenu({ options }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (e) => {
        setAnchorEl(null)
        e.stopPropagation()
    }

    const handleOptionClick = (e, onClick) => {
        e.stopPropagation()
        onClick()
        handleClose(e)
    }

    return (
        <div>
            <IconButton
                onClick={handleClick}
                onMouseDown={(e) => { e.stopPropagation() }}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={e => e.stopPropagation()}
                onMouseDown={e => e.stopPropagation()}
            >
                {options.map(option => (
                    <MenuItem key={option.name} onClick={(e) => handleOptionClick(e, option.onClick)}>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default ThreeDotMenu
