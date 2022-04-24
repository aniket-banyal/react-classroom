import { Avatar } from "@mui/material"

const sizeMappings = {
    'small': { width: 36, height: 36 },
    'medium': { width: 40, height: 40 },
    'large': { width: 46, height: 46 }
}

function NameAvatar({ name, size = 'medium' }) {
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


export default NameAvatar
