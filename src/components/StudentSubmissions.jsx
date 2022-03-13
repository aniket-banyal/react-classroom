import { Divider, Grid, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import CenteredCircularProgress from "./CenteredCircularProgress"
import useStudent from "../hooks/api/useStudent"
import useStudentSubmissions from "../hooks/api/useStudentSubmissions"
import StudentSubmissionCard from "./StudentSubmissionCard"
import UserAvatar from "./UserAvatar";
import { useMemo, useState } from "react"
import SubmissionStatusSelect from "./SubmissionStatusSelect"


function StudentSubmissions() {
    const [selectedStatus, setSelectedStatus] = useState('All')
    const { code, studentId } = useParams()
    const { data: student, isLoading: isLoadingStudent } = useStudent(code, studentId)
    const { data: submissions, isLoading: isLoadingSubmissions } = useStudentSubmissions(code, studentId)

    const filteredSubmissions = useMemo(() => {
        if (isLoadingSubmissions)
            return []

        if (selectedStatus === 'All')
            return submissions

        return submissions.filter(submission => submission.status === selectedStatus)
    }, [submissions, selectedStatus])


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

            <Grid container>
                <Grid item xs={3}>
                    <SubmissionStatusSelect
                        value={selectedStatus}
                        onChange={(status) => setSelectedStatus(status)}
                    />
                </Grid>
            </Grid>

            <Stack spacing={2}>
                {filteredSubmissions.map(submission =>
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
