import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BasicModal from "./BasicModal";
import CommentSection from "./CommentSection";
import EditAnnouncement from "./EditAnnouncement";
import useUser from '../hooks/useUser'
import { getDateAndTimeInLocale } from "../helpers/dateTime";


function Announcement({ announcement, code, onEdit, onDelete, role }) {
    const [dateTime, setDateTime] = useState()
    const [editing, setEditing] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })
    const { user } = useUser()

    useEffect(() => {
        const createdAt = new Date(announcement.created_at)
        const editedAt = new Date(announcement.edited_at)
        const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)

        if (createdAt.getTime() == editedAt.getTime()) {
            setDateTime(`${createdDate} - ${createdTime}`)
        }
        else {
            const [editedDate, editedTime] = getDateAndTimeInLocale(editedAt)
            setDateTime(`${createdDate} - ${createdTime} (Edited at - ${editedDate} - ${editedTime})`)
        }

    }, [announcement.created_at, announcement.edited_at])


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
                        <p> {dateTime} </p>
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
