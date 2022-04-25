import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUserRole from "../../hooks/api/useUserRole";
import BasicModal from "../shared/BasicModal"; import EditAssignment from "./EditAssignment";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";
import useDeleteAssignment from "../../hooks/api/useDeleteAssignment";
import ThreeDotMenu from "../shared/ThreeDotMenu";
import ConfirmationModal from "../shared/ConfirmationModal";


function Assignment({ assignment }) {
    const [editing, setEditing] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const { code } = useParams()
    const { data: userRole } = useUserRole(code)
    const createdDateTime = useCreateEditDateTime(assignment.created_at, assignment.edited_at)
    const dueDateTime = useCreateDateTime(assignment.due_date_time)
    const { mutate, isLoading } = useDeleteAssignment()

    const onEdit = () => setEditing(false)

    const onDelete = () => {
        mutate({ code, assignmentId: assignment.id })
    }

    const options = [
        { name: 'Edit', onClick: () => setEditing(true) },
        { name: 'Delete', onClick: () => setDeleteConfirmOpen(true) }
    ]


    return (
        <>
            <BasicModal
                open={editing}
                setOpen={setEditing}
                title='Edit Assignment'
            >
                <span>
                    <EditAssignment assignmentId={assignment.id} onSubmit={onEdit} />
                </span>
            </BasicModal>

            <ConfirmationModal
                open={deleteConfirmOpen}
                setOpen={setDeleteConfirmOpen}
                title={`Delete Assignment?`}
                body={`You are deleting assignment ${assignment.title}`}
                isLoading={isLoading}
                onConfirm={onDelete}
            />

            <Card>
                <CardActionArea component={Link} to={`/${code}/assignments/${assignment.id}`}>
                    <CardContent>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Box sx={{ width: '60%' }}>
                                <Typography
                                    variant="h5"
                                    color='primary'
                                    noWrap
                                    gutterBottom
                                >
                                    {assignment.title}
                                </Typography>

                                <Typography variant="subtitle1">
                                    {assignment.points} points
                                </Typography>
                            </Box>

                            <Stack direction='row' alignItems='center' spacing={2}>
                                <Typography
                                    variant="subtitle1"
                                    color='text.secondary'
                                >
                                    Due {dueDateTime}
                                </Typography>

                                {userRole === 'teacher' && <ThreeDotMenu options={options} />}
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default Assignment
