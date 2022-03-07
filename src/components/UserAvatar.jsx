import { Avatar } from "@mui/material"

const sizeMappings = {
    'small': { width: 34, height: 34 },
    'medium': { width: 40, height: 40 },
    'large': { width: 46, height: 46 }
}

function UserAvatar({ name, size = 'medium' }) {
    if (name === '')
        return null

    return (
        <Avatar
            sx={{ ...sizeMappings[size] }}
        >
            {name.at(0)}
        </Avatar>
    )
}


export default UserAvatar
