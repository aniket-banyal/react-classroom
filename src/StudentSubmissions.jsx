import { Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import CenteredCircularProgress from "./components/CenteredCircularProgress"
import useStudentSubmissions from "./hooks/api/useStudentSubmissions"
import StudentSubmissionCard from "./StudentSubmissionCard"


function StudentSubmissions() {
    const { code, studentId } = useParams()
    const { data: submissions, isLoading } = useStudentSubmissions(code, studentId)

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <>
            <Stack spacing={2}>
                {submissions.map(submission =>
                    <StudentSubmissionCard
                        key={submission.assignment.id}
                        submission={submission}
                    />
                )}
            </Stack>
        </>
    )
}


export default StudentSubmissions
