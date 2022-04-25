import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import StudentSubmission from "../Submission/Student/StudentSubmission";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";
import { useAssignment } from "../../hooks/api/useAssignment";
import useUserRole from "../../hooks/api/useUserRole";
import CenteredCircularProgress from "../shared/CenteredCircularProgress";
import ThreeDotMenu from "../shared/ThreeDotMenu";
import { useState } from "react";
import useDeleteAssignment from "../../hooks/api/useDeleteAssignment";
import BasicModal from "../shared/BasicModal";
import EditAssignment from "./EditAssignment";
import ConfirmationModal from "../shared/ConfirmationModal";


function AssignmentDetail() {
    const [editing, setEditing] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const { code, assignmentId } = useParams()
    const { data: userRole } = useUserRole(code)
    const { data: assignment, isLoading } = useAssignment(code, assignmentId)
    const createdDateTime = useCreateEditDateTime(assignment?.created_at, assignment?.edited_at)
    const dueDateTime = useCreateDateTime(assignment?.due_date_time)
    const { mutate, isLoadingDelete } = useDeleteAssignment()
    const navigate = useNavigate()

    const onEdit = () => setEditing(false)

    const onDelete = () => {
        mutate({ code, assignmentId })
        navigate(`/${code}/dashboard/assignments`)
    }

    const options = [
        { name: 'Edit', onClick: () => setEditing(true) },
        { name: 'Delete', onClick: () => setDeleteConfirmOpen(true) }
    ]

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <>
            <BasicModal
                open={editing}
                setOpen={setEditing}
                title='Edit Assignment'
            >
                <span>
                    <EditAssignment assignmentId={assignmentId} onSubmit={onEdit} />
                </span>
            </BasicModal>

            <ConfirmationModal
                open={deleteConfirmOpen}
                setOpen={setDeleteConfirmOpen}
                title={`Delete Assignment?`}
                body={`You are deleting assignment ${assignment.title}`}
                isLoading={isLoadingDelete}
                onConfirm={onDelete}
            />

            <Stack direction='row' spacing={5}>
                <Card sx={{ flexGrow: 1 }}>
                    <CardContent>
                        <Stack>
                            <Stack direction='row' alignItems='flex-start' justifyContent='space-between'>
                                <Box sx={{ width: '80%' }}>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        color='primary'
                                    >
                                        {assignment.title}
                                    </Typography>
                                </Box>

                                {userRole === 'teacher' && <ThreeDotMenu options={options} />}
                            </Stack>

                            <Stack direction='row' alignItems='flex-end' justifyContent='space-between'>
                                <Stack>
                                    <Typography
                                        variant="subtitle2"
                                        color={'text.secondary'}
                                        gutterBottom
                                    >
                                        Posted {createdDateTime}
                                    </Typography>

                                    <Typography variant="subtitle1">
                                        {assignment.points} points
                                    </Typography>
                                </Stack>

                                <Typography
                                    variant="subtitle1"
                                    color='text.secondary'
                                >
                                    Due {dueDateTime}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <pre style={{ whiteSpace: 'pre-line', marginBottom: 0 }}>
                            <Typography variant="subtitle1">
                                {assignment.text}
                            </Typography>
                        </pre>
                    </CardContent>
                </Card>

                {userRole === 'student' && <StudentSubmission totalPoints={assignment.points} />}
            </Stack>
        </>
    )
}

export default AssignmentDetail
