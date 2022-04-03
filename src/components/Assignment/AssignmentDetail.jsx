import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import StudentSubmission from "../Submission/Student/StudentSubmission";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";
import { useAssignment } from "../../hooks/api/useAssignment";
import useUserRole from "../../hooks/api/useUserRole";
import CenteredCircularProgress from "../CenteredCircularProgress";


function AssignmentDetail() {
    const { code, assignmentId } = useParams()
    const { data: userRole } = useUserRole(code)
    const { data: assignment, isLoading } = useAssignment(code, assignmentId)
    const createdDateTime = useCreateEditDateTime(assignment?.created_at, assignment?.edited_at)
    const dueDateTime = useCreateDateTime(assignment?.due_date_time)


    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <Stack direction='row' spacing={5}>
            <Card sx={{ flexGrow: 1 }}>
                <CardContent>
                    <Stack direction='row' alignItems='flex-end' justifyContent='space-between'>
                        <Box sx={{ width: '80%' }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                color='primary'
                            >
                                {assignment.title}
                            </Typography>

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
                        </Box>

                        <Box>
                            <Typography variant="subtitle1">
                                Due {dueDateTime}
                            </Typography>
                        </Box>
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
    )
}

export default AssignmentDetail
