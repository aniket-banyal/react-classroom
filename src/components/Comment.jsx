import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { getDateAndTimeInLocale } from "../helpers/dateTime"

function Comment({ comment }) {
    const [dateTime, setDateTime] = useState()

    useEffect(() => {
        const createdAt = new Date(comment.created_at)
        const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)
        setDateTime(`${createdDate} - ${createdTime}`)

    }, [comment.created_at])


    return (
        <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
            <div>
                <p> {comment.author.name} </p>
                <p> {dateTime} </p>
            </div>
            <p> {comment.text} </p>
        </Box>
    )

}

export default Comment
