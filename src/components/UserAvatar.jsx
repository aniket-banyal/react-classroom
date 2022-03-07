import { Avatar } from "@mui/material"

function UserAvatar({ name }) {

    if (name === '')
        return null

    return (
        <Avatar> {name.at(0)}</Avatar>
    )
}


export default UserAvatar
