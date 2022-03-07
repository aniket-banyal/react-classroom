import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useDeleteComment from "../../hooks/api/useDeleteComment"
import useCreateDateTime from "../../hooks/useCreateDateTime"
import useUser from "../../hooks/api/useUser"
import useUserRole from "../../hooks/api/useUserRole"
import ThreeDotMenu from "../ThreeDotMenu"
import UserAvatar from "../UserAvatar"

function Comment({ comment, announcementId }) {
    const [menuOptions, setMenuOptions] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const { code } = useParams()
    const { data: user } = useUser()
    const { data: userRole } = useUserRole(code)
    const dateTime = useCreateDateTime(comment.created_at)
    const { mutate } = useDeleteComment()

    const onDelete = () => {
        mutate({ code, announcementId, commentId: comment.id })
    }


    useEffect(() => {
        //comment can be deleted by the teacher as well as author of the comment 
        const allowDelete = userRole === 'teacher' || user?.email === comment.author.email

        if (allowDelete)
            setMenuOptions(
                [
                    { name: 'Delete', onClick: onDelete }
                ]
            )
    }, [userRole, user?.email, comment.author.email])

    return (
        <Card
            onMouseOver={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            <CardContent>
                <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <UserAvatar
                            size='small'
                            name={comment.author.name}
                        />

                        <Stack>
                            <Typography variant="subtitle1">
                                {comment.author.name}
                            </Typography>

                            <Typography variant="caption" >
                                {dateTime}
                            </Typography>
                        </Stack>
                    </Stack>

                    {showMenu && menuOptions.length > 0 && <ThreeDotMenu options={menuOptions} />}
                </Box>

                <pre style={{ whiteSpace: 'pre-line', marginBottom: 0 }}>
                    <Typography variant="subtitle1">
                        {comment.text}
                    </Typography>
                </pre>

            </CardContent>
        </Card>
    )
}

export default Comment
