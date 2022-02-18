import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { getDateAndTimeInLocale } from "../helpers/dateTime"
import useUser from "../hooks/useUser"

function Comment({ comment, onDelete, role }) {
    const [dateTime, setDateTime] = useState()
    const [contextMenu, setContextMenu] = useState({
        allowDelete: false
    })
    const { user } = useUser()


    useEffect(() => {
        const createdAt = new Date(comment.created_at)
        const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)
        setDateTime(`${createdDate} - ${createdTime}`)

    }, [comment.created_at])


    useEffect(() => {
        setContextMenu(
            {
                //comment can be deleted by the teacher as well as author of the comment 
                allowDelete: role == 'teacher' || user.email == comment.author.email
            }
        )
    }, [role, comment.author.email])

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
