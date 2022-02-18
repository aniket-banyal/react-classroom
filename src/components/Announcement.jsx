import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BasicModal from "./BasicModal";
import CommentSection from "./CommentSection";
import EditAnnouncement from "./EditAnnouncement";
import useUser from '../hooks/useUser'


function Announcement({ announcement, code, onEdit, onDelete, role }) {
    const [dateTime, setDateTime] = useState()
    const [editing, setEditing] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })
    const { user } = useUser()

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

    useEffect(() => {
        setContextMenu(
            {
                //teacher is allowed to edit his own announcements
                allowEdit: role == 'teacher' && user.email == announcement.author.email,
                //announcement can be deleted by the teacher as well as author of the announcement 
                allowDelete: role == 'teacher' || user.email == announcement.author.email
            }
        )
    }, [role, announcement.author.email])


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
                        <p> {announcement.author.name} </p>
                        {dateTime && <p> {dateTime.date} - {dateTime.time} </p>}
                    </div>

                    <div>
                        {contextMenu.allowEdit && <Button onClick={() => setEditing(true)}> Edit </Button>}
                        {contextMenu.allowDelete && <Button onClick={() => onDelete(announcement.id)}> Delete </Button>}
                    </div>
                </div>
                <pre> {announcement.text} </pre>

                <CommentSection code={code} id={announcement.id} />
            </Box>
        </>
    )
}

export default Announcement
