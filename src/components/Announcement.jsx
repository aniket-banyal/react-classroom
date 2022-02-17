import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CommentSection from "./CommentSection";

function Announcement({ announcement, code }) {

    const [dateTime, setDateTime] = useState()

    useEffect(() => {
        const created_at = new Date(announcement.created_at)
        const date = created_at.toLocaleDateString('en-US', { dateStyle: 'medium' })
        const time = created_at.toLocaleTimeString('en-US', { timeStyle: 'short' })
        setDateTime({ date, time })
    }, [announcement.created_at])

    return (
        <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
            <p> {announcement.author_name} </p>
            {dateTime && <p> {dateTime.date} - {dateTime.time} </p>}
            <pre> {announcement.text} </pre>

            <CommentSection code={code} id={announcement.id} />
        </Box>
    )
}

export default Announcement
