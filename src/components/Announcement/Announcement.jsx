import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CommentSection from "../Comment/CommentSection";
import EditAnnouncement from "./EditAnnouncement";
import useUser from '../../hooks/api/useUser'
import useUserRole from '../../hooks/api/useUserRole'
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import { useParams } from "react-router-dom";
import useDeleteAnnouncement from "../../hooks/api/useDeleteAnnouncement";


function Announcement({ announcement }) {
    const [editing, setEditing] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })
    const { code } = useParams()
    const { data: user } = useUser()
    const { data: userRole } = useUserRole(code)
    const dateTime = useCreateEditDateTime(announcement.created_at, announcement.edited_at)
    const { mutate } = useDeleteAnnouncement()

    const onEdit = () => {
        setEditing(false)
    }

    const onDelete = async () => {
        mutate({ code, announcement_id: announcement.id })
    }

    useEffect(() => {
        setContextMenu(
            {
                //teacher is allowed to edit his own announcements
                allowEdit: userRole === 'teacher' && user?.email === announcement.author.email,
                //announcement can be deleted by the teacher as well as author of the announcement 
                allowDelete: userRole === 'teacher' || user?.email === announcement.author.email
            }
        )
    }, [userRole, user?.email, announcement.author.email])


    return (
        <>
            <EditAnnouncement
                announcement={announcement}
                onSubmit={onEdit}
                open={editing}
                setOpen={setEditing}
            />

            <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                    <div>
                        <p> {announcement.author.name} </p>
                        <p> {dateTime} </p>
                    </div>

                    <div>
                        {contextMenu.allowEdit && <Button onClick={() => setEditing(true)}> Edit </Button>}
                        {contextMenu.allowDelete && <Button onClick={() => onDelete()}> Delete </Button>}
                    </div>
                </div>
                <pre> {announcement.text} </pre>

                <CommentSection announcementId={announcement.id} />
            </Box>
        </>
    )
}

export default Announcement
