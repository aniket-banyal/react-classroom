import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BasicModal from "../BasicModal";
import CommentSection from "../Comment/CommentSection";
import EditAnnouncement from "./EditAnnouncement";
import useUser from '../../hooks/useUser'
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";


function Announcement({ announcement, onEdit, onDelete }) {
    const [editing, setEditing] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })
    const { user } = useUser()
    const dateTime = useCreateEditDateTime(announcement.created_at, announcement.edited_at)

    const editAnnouncement = async (text) => {
        onEdit(announcement.id, text)
        setEditing(false)
    }

    useEffect(() => {
        setContextMenu(
            {
                //teacher is allowed to edit his own announcements
                allowEdit: user.role === 'teacher' && user.email === announcement.author.email,
                //announcement can be deleted by the teacher as well as author of the announcement 
                allowDelete: user.role === 'teacher' || user.email === announcement.author.email
            }
        )
    }, [user.role, user.email, announcement.author.email])


    return (
        <>
            {
                <BasicModal open={editing} setOpen={setEditing} >
                    <span>
                        <EditAnnouncement announcement={announcement} onSubmit={editAnnouncement} />
                    </span>
                </BasicModal>
            }

            <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                    <div>
                        <p> {announcement.author.name} </p>
                        <p> {dateTime} </p>
                    </div>

                    <div>
                        {contextMenu.allowEdit && <Button onClick={() => setEditing(true)}> Edit </Button>}
                        {contextMenu.allowDelete && <Button onClick={() => onDelete(announcement.id)}> Delete </Button>}
                    </div>
                </div>
                <pre> {announcement.text} </pre>

                <CommentSection announcementId={announcement.id} />
            </Box>
        </>
    )
}

export default Announcement
