import { Card, CardActionArea, CardContent, Divider, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import useUnenrollStudent from "../hooks/api/useUnenrollStudent";
import useUser from "../hooks/api/useUser";
import useUserRole from "../hooks/api/useUserRole";
import BasicModal from "./BasicModal";
import ConfirmationModal from "./ConfirmationModal";
import EditClassroom from "./EditClassroom";
import ThreeDotMenu from "./ThreeDotMenu";
import useDeleteClassroom from "../hooks/api/useDeleteClassroom";
import UpcomingAssignments from "./UpcomingAssignments";


function ClassCard({ classroom }) {
    const [menuOptions, setMenuOptions] = useState([])
    const [editing, setEditing] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [unenrollConfirmOpen, setUnenrollConfirmOpen] = useState(false)
    const code = classroom.code
    const { data: user } = useUser(code)
    const { data: userRole } = useUserRole(code)
    const { mutate, isLoading } = useDeleteClassroom()
    const { mutate: unenrollMutate, isLoading: isLoadingUnenroll } = useUnenrollStudent()

    const onEdit = () => setEditing(false)

    const onDelete = () => mutate({ code })

    const handleUnenroll = () => {
        unenrollMutate({ code, id: user.id })
    }

    const editMenuItem = { name: 'Edit', onClick: () => setEditing(true) }
    const deleteMenuItem = { name: 'Delete', onClick: () => setDeleteConfirmOpen(true) }
    const unenrollMenuItem = { name: 'Unenroll', onClick: () => setUnenrollConfirmOpen(true) }


    useEffect(() => {
        const allowEdit = userRole === 'teacher'
        const allowDelete = userRole === 'teacher'
        const allowUnenroll = userRole === 'student'

        setMenuOptions([
            ...(allowEdit ? [editMenuItem] : []),
            ...(allowDelete ? [deleteMenuItem] : []),
            ...(allowUnenroll ? [unenrollMenuItem] : [])
        ])

    }, [userRole])


    return (
        <>
            <BasicModal
                open={editing}
                setOpen={setEditing}
                title='Edit Classroom'
            >
                <span>
                    <EditClassroom classroom={classroom} onSubmit={onEdit} />
                </span>
            </BasicModal>

            <ConfirmationModal
                open={deleteConfirmOpen}
                setOpen={setDeleteConfirmOpen}
                title={`Delete Classroom?`}
                body={`You are deleting classroom ${classroom.name}`}
                isLoading={isLoading}
                onConfirm={onDelete}
            />

            <ConfirmationModal
                open={unenrollConfirmOpen}
                setOpen={setUnenrollConfirmOpen}
                title={`Unenroll from Classroom?`}
                body={`You will be removed from classroom ${classroom.name}`}
                isLoading={isLoadingUnenroll}
                onConfirm={handleUnenroll}
            />

            <Card
                sx={{ minHeight: 275 }}
            >
                <Stack direction='row' justifyContent='space-between'>
                    <Stack sx={{ width: '100%' }}>
                        <CardActionArea component={Link} to={`${classroom.code}/dashboard`} >
                            <CardContent>
                                <Typography variant="h4">
                                    {classroom.name}
                                </Typography>

                                <Typography variant="subtitle1">
                                    Subject: {classroom.subject}
                                </Typography>

                                <Typography variant="subtitle2">
                                    Teacher: {classroom.teacher.name}
                                </Typography>

                                <Divider
                                    sx={{ mt: 2 }}
                                />
                            </CardContent>
                        </CardActionArea>

                        <CardContent>
                            <UpcomingAssignments code={code} />
                        </CardContent>
                    </Stack>

                    {menuOptions.length > 0 && <ThreeDotMenu options={menuOptions} />}
                </Stack>
            </Card>
        </>
    )
}

export default ClassCard
