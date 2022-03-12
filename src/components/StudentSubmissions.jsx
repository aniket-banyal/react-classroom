import { Divider, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import CenteredCircularProgress from "./CenteredCircularProgress"
import useStudent from "../hooks/api/useStudent"
import useStudentSubmissions from "../hooks/api/useStudentSubmissions"
import StudentSubmissionCard from "./StudentSubmissionCard"
import UserAvatar from "./UserAvatar";


function StudentSubmissions() {
    const { code, studentId } = useParams()
    const { data: student, isLoading: isLoadingStudent } = useStudent(code, studentId)
    const { data: submissions, isLoading: isLoadingSubmissions } = useStudentSubmissions(code, studentId)

    if (isLoadingStudent || isLoadingSubmissions) {
        return <CenteredCircularProgress />
    }

    return (
        <Stack spacing={4}>
            <Stack direction='row' alignItems='center' spacing={4}>
                <UserAvatar size="large" name={student.name} />

                <Typography variant='h5'>
                    {student.name}
                </Typography>
            </Stack>

            <Divider />

            <Stack spacing={2}>
                {submissions.map(submission =>
                    <StudentSubmissionCard
                        key={submission.assignment.id}
                        submission={submission}
                    />
                )}
            </Stack>
        </Stack>
    )
}


export default StudentSubmissions
