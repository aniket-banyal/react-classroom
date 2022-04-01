import { Button, Card, CardContent, Stack } from "@mui/material"
import { Box } from "@mui/system"
import { useParams } from "react-router-dom"
import useStudentSubmission from "../../../hooks/api/useStudentSubmission"
import useCreateDateTime from "../../../hooks/useCreateDateTime"
import CreateSubmission from "./CreateSubmission"
import { Typography } from '@mui/material';
import CenteredCircularProgress from '../../CenteredCircularProgress'
import SubmissionStatus from "../../SubmissionStatus"

function StudentSubmission({ totalPoints }) {
    const { code, assignmentId } = useParams()
    const { data: submission, isLoading } = useStudentSubmission(code, assignmentId)
    const submittedDateTime = useCreateDateTime(submission?.created_at)


    return (
        <Stack>
            <Card sx={{
                minWidth: 350
            }}
            >
                <CardContent>
                    {isLoading ?
                        <CenteredCircularProgress />
                        :
                        <Stack spacing={2}>
                            <Box>
                                <Stack direction='row' justifyContent='space-between' >
                                    <Typography variant='h5' gutterBottom>
                                        Your Work
                                    </Typography>

                                    <SubmissionStatus status={submission.status} />
                                </Stack>

                                {submission.points &&
                                    <Typography variant='subtitle2' >
                                        {`${submission.points}/${totalPoints}`}
                                    </Typography>
                                }
                            </Box>

                            {(submission.status === 'Done' ||
                                submission.status === 'Submitted Late' ||
                                submission.status === 'Graded') &&
                                <Stack spacing={3}>
                                    <Typography variant='subtitle2'>
                                        {submittedDateTime}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        target="_blank"
                                        href={submission.url}
                                    >
                                        Submission
                                    </Button>
                                </Stack>
                            }

                            {(submission.status === 'Assigned' || submission.status === 'Missing') &&
                                <CreateSubmission />
                            }
                        </Stack>
                    }
                </CardContent>
            </Card>
        </Stack >
    )
}


export default StudentSubmission
