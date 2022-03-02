import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useDeleteComment from "../../hooks/api/useDeleteComment"
import useCreateDateTime from "../../hooks/useCreateDateTime"
import useUser from "../../hooks/api/useUser"
import useUserRole from "../../hooks/api/useUserRole"

function Comment({ comment, announcementId }) {
    const [contextMenu, setContextMenu] = useState({
        allowDelete: false
    })
    const { code } = useParams()
    const { data: user } = useUser()
    const { data: userRole } = useUserRole(code)
    const dateTime = useCreateDateTime(comment.created_at)
    const { mutate } = useDeleteComment()

    const onDelete = () => {
        mutate({ code, announcementId, commentId: comment.id })
    }

    useEffect(() => {
        setContextMenu(
            {
                //comment can be deleted by the teacher as well as author of the comment 
                allowDelete: userRole === 'teacher' || user?.email === comment.author.email
            }
        )
    }, [userRole, user?.email, comment.author.email])

    return (
        <Card>
            <CardContent>
                <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="subtitle1">
                            {comment.author.name}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom>
                            {dateTime}
                        </Typography>
                    </Box>

                    <Box>
                        {contextMenu.allowDelete && <Button onClick={onDelete}> Delete </Button>}
                    </Box>
                </Box>

                <Typography variant="subtitle1">
                    {comment.text}
                </Typography>

            </CardContent>
        </Card>
    )

}

export default Comment
