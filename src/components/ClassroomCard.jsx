import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material"
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


function ClassCard({ classroom }) {
    const [menuOptions, setMenuOptions] = useState([])
    const [editing, setEditing] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const code = classroom.code
    const { data: user } = useUser(code)
    const { data: userRole } = useUserRole(code)
    const { mutate, isLoading } = useDeleteClassroom()
    const { mutate: unenrollMutate } = useUnenrollStudent()

    const onEdit = () => setEditing(false)

    const onDelete = () => mutate({ code })

    const handleUnenroll = () => {
        unenrollMutate({ code, id: user.id })
    }

    const editMenuItem = { name: 'Edit', onClick: () => setEditing(true) }
    const deleteMenuItem = { name: 'Delete', onClick: () => setDeleteConfirmOpen(true) }
    const unenrollMenuItem = { name: 'Unenroll', onClick: handleUnenroll }


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

            <Card>
                <Stack direction='row' justifyContent='space-between'>
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
                        </CardContent>
                    </CardActionArea>

                    {menuOptions.length > 0 && <ThreeDotMenu options={menuOptions} />}
                </Stack>
            </Card>
        </>
    )
}

export default ClassCard
