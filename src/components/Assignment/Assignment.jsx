import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUserRole from "../../hooks/api/useUserRole";
import BasicModal from "../shared/BasicModal"; import EditAssignment from "./EditAssignment";
import useCreateDateTime from "../../hooks/useCreateDateTime";
import useDeleteAssignment from "../../hooks/api/useDeleteAssignment";
import ThreeDotMenu from "../shared/ThreeDotMenu";
import ConfirmationModal from "../shared/ConfirmationModal";


function Assignment({ assignment }) {
    const [editing, setEditing] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const { code } = useParams()
    const { data: userRole } = useUserRole(code)
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
                        <Stack>
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
                                </Box>

                                {userRole === 'teacher' && <ThreeDotMenu options={options} />}
                            </Stack>

                            <Stack direction='row' alignItems='flex-end' justifyContent='space-between'>
                                <Typography variant="subtitle1">
                                    {assignment.points} points
                                </Typography>

                                <Typography
                                    variant="subtitle2"
                                    color='text.secondary'
                                >
                                    Due {dueDateTime}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default Assignment
