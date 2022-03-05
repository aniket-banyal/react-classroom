import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BasicModal from "../BasicModal";
import CommentSection from "../Comment/CommentSection";
import EditAnnouncement from "./EditAnnouncement";
import useUser from '../../hooks/api/useUser'
import useUserRole from '../../hooks/api/useUserRole'
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import { useParams } from "react-router-dom";
import useDeleteAnnouncement from "../../hooks/api/useDeleteAnnouncement";
import ThreeDotMenu from "../ThreeDotMenu";


function Announcement({ announcement }) {
    const [editing, setEditing] = useState(false)
    const [menuOptions, setMenuOptions] = useState([])
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
        //teacher is allowed to edit his own announcements
        const allowEdit = userRole === 'teacher' && user?.email === announcement.author.email
        //announcement can be deleted by the teacher as well as author of the announcement 
        const allowDelete = userRole === 'teacher' || user?.email === announcement.author.email

        if (allowEdit && allowDelete) {
            setMenuOptions([
                { name: 'Edit', onClick: () => setEditing(true) },
                { name: 'Delete', onClick: onDelete }
            ])
        }

        else if (allowEdit) {
            setMenuOptions([
                { name: 'Edit', onClick: () => setEditing(true) },
            ])
        }

        else if (allowDelete) {
            setMenuOptions([
                { name: 'Delete', onClick: onDelete }
            ])
        }
    }, [userRole, user?.email, announcement.author.email])


    return (
        <>
            <BasicModal
                open={editing}
                setOpen={setEditing}
                title='Edit Announcement'
            >
                <span>
                    <EditAnnouncement announcement={announcement} onSubmit={onEdit} />
                </span>
            </BasicModal>

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

                        {menuOptions.length > 0 && <ThreeDotMenu options={menuOptions} />}
                    </Box>

                    <pre style={{ whiteSpace: 'pre-line', marginBottom: 0 }}>
                        <Typography variant="subtitle1">
                            {announcement.text}
                        </Typography>
                    </pre>
                </CardContent>

                <Divider />

                <CommentSection announcementId={announcement.id} />
            </Card>
        </>
    )
}

export default Announcement
