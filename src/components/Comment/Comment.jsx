import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useDeleteComment from "../../hooks/api/useDeleteComment"
import useCreateDateTime from "../../hooks/useCreateDateTime"
import useUser from "../../hooks/useUser"

function Comment({ comment, announcementId }) {
    const [contextMenu, setContextMenu] = useState({
        allowDelete: false
    })
    const { user } = useUser()
    const dateTime = useCreateDateTime(comment.created_at)
    const { code } = useParams()
    const { mutate } = useDeleteComment()

    const onDelete = () => {
        mutate({ code, announcementId, commentId: comment.id })
    }

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

                {contextMenu.allowDelete && <Button onClick={onDelete}> Delete </Button>}
            </div>

            <p> {comment.text} </p>
        </Box>
    )

}

export default Comment
