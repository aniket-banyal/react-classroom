import { Button, Card, CardContent, Stack } from "@mui/material"
import { Box } from "@mui/system"
import { useParams } from "react-router-dom"
import useStudentSubmission from "../../../hooks/api/useStudentSubmission"
import useCreateDateTime from "../../../hooks/useCreateDateTime"
import CreateSubmission from "./CreateSubmission"
import { Typography } from '@mui/material';
import CenteredCircularProgress from "../../CenteredCircularProgress"


function StudentSubmission({ totalPoints }) {
    const { code, assignmentId } = useParams()
    const { data: submission, isLoading } = useStudentSubmission(code, assignmentId)
    const submittedDateTime = useCreateDateTime(submission?.created_at)


    return (
        <Stack>
            <Card sx={{
                minWidth: 275
            }}
            >
                <CardContent>
                    <Typography variant='h5' gutterBottom>
                        Your Work
                    </Typography>

                    {isLoading ?
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 2 }}
                        >
                            <CenteredCircularProgress />
                        </Box>
                        :
                        <>
                            <Stack direction='row' justifyContent='space-between' >
                                <Typography variant='subtitle1' >
                                    {submission.status}
                                </Typography>

                                {submission.points &&
                                    <Typography variant='subtitle2' >
                                        {`${submission.points}/${totalPoints}`}
                                    </Typography>
                                }
                            </Stack>

                            {(submission.status === 'Done' ||
                                submission.status === 'Submitted Late' ||
                                submission.status === 'Graded') &&
                                <>
                                    <Typography variant='subtitle2'>
                                        {submittedDateTime}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        target="_blank"
                                        href={submission.url}
                                        sx={{ mt: 4 }}
                                    >
                                        Submission
                                    </Button>
                                </>
                            }

                            {(submission.status === 'Assigned' || submission.status === 'Missing') &&
                                <Box sx={{ my: 2 }}>
                                    <CreateSubmission />
                                </Box>
                            }
                        </>
                    }
                </CardContent>
            </Card>
        </Stack >
    )
}


export default StudentSubmission
