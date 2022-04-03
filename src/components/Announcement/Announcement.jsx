import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
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
import NameAvatar from "../NameAvatar";
import ConfirmationModal from "../ConfirmationModal";


function Announcement({ announcement }) {
    const [editing, setEditing] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [menuOptions, setMenuOptions] = useState([])
    const { code } = useParams()
    const { data: user } = useUser()
    const { data: userRole } = useUserRole(code)
    const dateTime = useCreateEditDateTime(announcement.created_at, announcement.edited_at)
    const { mutate, isLoading } = useDeleteAnnouncement()

    const onEdit = async () => {
        setEditing(false)
    }

    const onDelete = async () => {
        mutate({ code, announcementId: announcement.id })
    }

    const editMenuItem = { name: 'Edit', onClick: () => setEditing(true) }
    const deleteMenuItem = { name: 'Delete', onClick: () => setDeleteConfirmOpen(true) }


    useEffect(() => {
        //teacher is allowed to edit his own announcements
        const allowEdit = userRole === 'teacher' && user?.email === announcement.author.email
        //announcement can be deleted by the teacher as well as author of the announcement 
        const allowDelete = userRole === 'teacher' || user?.email === announcement.author.email

        setMenuOptions([
            ...(allowEdit ? [editMenuItem] : []),
            ...(allowDelete ? [deleteMenuItem] : [])
        ])

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

            <ConfirmationModal
                open={deleteConfirmOpen}
                setOpen={setDeleteConfirmOpen}
                title={`Delete Announcement?`}
                body={`You are deleting announcement`}
                isLoading={isLoading}
                onConfirm={onDelete}
            />

            <Card>
                <CardContent>
                    <Stack direction='row' justifyContent='space-between'>

                        <Stack direction='row' spacing={2} alignItems='center'>
                            <NameAvatar name={announcement.author.name} />

                            <Box>
                                <Typography variant="subtitle1">
                                    {announcement.author.name}
                                </Typography>

                                <Typography
                                    variant="subtitle2"
                                    color={'text.secondary'}
                                >
                                    {dateTime}
                                </Typography>
                            </Box>
                        </Stack>

                        {menuOptions.length > 0 && <ThreeDotMenu options={menuOptions} />}
                    </Stack>

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
