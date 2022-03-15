import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import useDeleteClassroom from "../hooks/api/useDeleteClassroom";
import useUnenrollStudent from "../hooks/api/useUnenrollStudent";
import useUser from "../hooks/api/useUser";
import useUserRole from "../hooks/api/useUserRole";
import BasicModal from "./BasicModal";
import EditClassroom from "./EditClassroom";
import ThreeDotMenu from "./ThreeDotMenu";


function ClassCard({ classroom }) {
    const [menuOptions, setMenuOptions] = useState([])
    const [editing, setEditing] = useState(false)
    const code = classroom.code
    const { data: user } = useUser(code)
    const { data: userRole } = useUserRole(code)
    const { mutate } = useDeleteClassroom()
    const { mutate: unenrollMutate } = useUnenrollStudent()

    const onEdit = () => setEditing(false)

    const onDelete = () => {
        mutate({ code })
    }
    const handleUnenroll = () => {
        unenrollMutate({ code, id: user.id })
    }

    useEffect(() => {
        const allowEditAndDelete = userRole === 'teacher'
        const allowUnenroll = userRole === 'student'

        if (allowEditAndDelete) {
            setMenuOptions([
                { name: 'Edit', onClick: () => setEditing(true) },
                { name: 'Delete', onClick: onDelete }
            ])
        }
        if (allowUnenroll) {
            setMenuOptions([
                { name: 'Unenroll', onClick: handleUnenroll }
            ])
        }

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
