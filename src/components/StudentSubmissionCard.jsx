import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material"
import { Link, useParams } from "react-router-dom"


function StudentSubmissionCard({ submission }) {
    const { code, studentId } = useParams()

    return (
        <Card>
            <CardActionArea
                component={Link}
                to={`/${code}/assignments/${submission.assignment.id}/submissions/${studentId}`}
            >
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
            </CardActionArea>
        </Card>
    )
}


export default StudentSubmissionCard
