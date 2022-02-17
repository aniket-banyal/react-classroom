import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BasicModal from "./BasicModal";
import CommentSection from "./CommentSection";
import EditAnnouncement from "./EditAnnouncement";

function Announcement({ announcement, code, onEdit }) {
    const [dateTime, setDateTime] = useState()
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        const created_at = new Date(announcement.created_at)
        const date = created_at.toLocaleDateString('en-US', { dateStyle: 'medium' })
        const time = created_at.toLocaleTimeString('en-US', { timeStyle: 'short' })
        setDateTime({ date, time })
    }, [announcement.created_at])


    const editAnnouncement = async (text) => {
        onEdit(announcement.id, text)
        setEditing(false)
    }


    return (
        <>
            {
                editing &&
                <BasicModal open={editing} setOpen={setEditing} >
                    <span>
                        <EditAnnouncement initialText={announcement.text} onSubmit={editAnnouncement} />
                    </span>
                </BasicModal>
            }

            <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                    <div>
                        <p> {announcement.author_name} </p>
                        {dateTime && <p> {dateTime.date} - {dateTime.time} </p>}
                    </div>

                    <Button onClick={() => setEditing(true)} >Edit</Button>
                </div>
                <pre> {announcement.text} </pre>

                <CommentSection code={code} id={announcement.id} />
            </Box>
        </>
    )
}

export default Announcement
