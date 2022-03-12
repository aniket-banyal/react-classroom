import { Card, CardContent, Stack, Typography } from "@mui/material"


function StudentSubmissionCard({ submission }) {
    return (
        <Card>
            <CardContent>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography>
                        {submission.assignment.title}
                    </Typography>

                    <Typography>
                        {submission.status === 'Graded' ?
                            `${submission.submission.points}/${submission.assignment.points}`
                            :
                            submission.status
                        }
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}


export default StudentSubmissionCard
