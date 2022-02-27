import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BasicModal from "../BasicModal";
import CommentSection from "../Comment/CommentSection";
import EditAnnouncement from "./EditAnnouncement";
import useUser from '../../hooks/useUser'
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import useDeleteAnnouncement from "../../hooks/api/useDeleteAnnouncement";


function Announcement({ announcement }) {
    const [editing, setEditing] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })
    const { user } = useUser()
    const dateTime = useCreateEditDateTime(announcement.created_at, announcement.edited_at)
    const { code } = useParams()
    const { mutate } = useDeleteAnnouncement()
    const queryClient = useQueryClient()

    const onEdit = async () => {
        setEditing(false)
    }

    const onDelete = async () => {
        mutate({ code, announcement_id: announcement.id }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['announcements', code])
            }
        })
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
                        <EditAnnouncement announcement={announcement} onSubmit={onEdit} />
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
