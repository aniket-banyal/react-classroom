import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BasicModal from "../BasicModal";
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

    const onEdit = async () => {
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
            {
                <BasicModal
                    open={editing}
                    setOpen={setEditing}
                    title='Edit Announcement'
                >
                    <span>
                        <EditAnnouncement announcement={announcement} onSubmit={onEdit} />
                    </span>
                </BasicModal>
            }

            <Card>
                <CardContent>
                    <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                        <Box>
                            <Typography variant="subtitle1">
                                {announcement.author.name}
                            </Typography>

                            <Typography variant="subtitle2">
                                {dateTime}
                            </Typography>
                        </Box>

                        <Box>
                            {contextMenu.allowEdit && <Button onClick={() => setEditing(true)}> Edit </Button>}
                            {contextMenu.allowDelete && <Button onClick={() => onDelete()}> Delete </Button>}
                        </Box>
                    </Box>

                    <pre style={{ whiteSpace: 'pre-line' }}>
                        <Typography variant="subtitle1">
                            {announcement.text}
                        </Typography>
                    </pre>

                    <Divider />


                </CardContent>

                <CommentSection announcementId={announcement.id} />
            </Card>
        </>
    )
}

export default Announcement
