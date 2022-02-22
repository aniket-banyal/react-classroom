import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import useCreateDateTime from "../../hooks/useCreateDateTime"
import useUser from "../../hooks/useUser"

function Comment({ comment, onDelete }) {
    const [contextMenu, setContextMenu] = useState({
        allowDelete: false
    })
    const { user } = useUser()
    const dateTime = useCreateDateTime(comment.created_at)

    useEffect(() => {
        setContextMenu(
            {
                //comment can be deleted by the teacher as well as author of the comment 
                allowDelete: user.role === 'teacher' || user.email === comment.author.email
            }
        )
    }, [user.role, user.email, comment.author.email])

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                <div>
                    <p> {comment.author.name} </p>
                    <p> {dateTime} </p>
                </div>

                {contextMenu.allowDelete && <Button onClick={() => onDelete(comment.id)}> Delete </Button>}
            </div>

            <p> {comment.text} </p>
        </Box>
    )

}

export default Comment
