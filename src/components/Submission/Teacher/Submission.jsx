import { LoadingButton } from "@mui/lab"
import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { addErrorToast } from "../../../helpers/addToast"
import { useAssignmentPoints } from "../../../hooks/api/useAssignment"
import useGradeSubmission from "../../../hooks/api/useGradeSubmission"
import useCreateDateTime from "../../../hooks/useCreateDateTime"
import SubmissionStatus from "../../SubmissionStatus"
import UserAvatar from '../../UserAvatar';


function Submission({ submission }) {
    const [showGradingInp, setShowGradingInp] = useState(false)
    const [points, setPoints] = useState('')
    const { code, assignmentId } = useParams()
    const submittedAt = useCreateDateTime(submission?.submission?.created_at)
    const { data: totalPoints } = useAssignmentPoints(code, assignmentId)
    const { mutate, isLoading } = useGradeSubmission()

    const handleSubmit = async e => {
        e.preventDefault()
        const body = { points }

        mutate({ code, assignmentId, submissionId: submission.submission.id, body }, {
            onSuccess: () => {
                setShowGradingInp(false)
            },
            onError: (error) => {
                const { status, data } = error.response
                if (status === 400)
                    addErrorToast(data.points[0])
            }
        })
    }

    useEffect(() => {
        if (submission?.submission)
            setShowGradingInp(
                !submission.submission.points &&
                (submission.status === 'Done' || submission.status === 'Submitted Late')
            )
    }, [submission?.status])

    if (!submission || submission.status === 'Assigned' || submission.status === 'Missing')
        return null


    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <UserAvatar name={submission.student.name} />
                        <Typography variant='h6'>
                            {submission.student.name}
                        </Typography>
                    </Stack>

                    <Box>
                        <Stack direction='row' justifyContent='space-between' >
                            <SubmissionStatus status={submission.status} />

                            {submission.submission.points &&
                                <Typography variant='subtitle2'>
                                    {`${submission.submission.points}/${totalPoints}`}
                                </Typography>
                            }
                        </Stack>

                        <Typography variant='subtitle2'>
                            {submittedAt}
                        </Typography>
                    </Box>
                </Stack>

                {submission.submission &&
                    <Stack
                        spacing={2}
                        sx={{ mt: 2 }}
                    >
                        <Button
                            variant="contained"
                            target="_blank"
                            href={submission.submission.url}
                        >
                            Submission
                        </Button>

                        {showGradingInp &&
                            <>
                                <Divider />

                                <Typography variant='body1'>
                                    Grade Submission
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={2}>
                                        <TextField
                                            variant="outlined"
                                            type="number"
                                            inputProps={{ min: "0", max: totalPoints }}
                                            placeholder='Points'
                                            required
                                            value={points}
                                            onChange={e => setPoints(e.target.value)}
                                        />

                                        <LoadingButton
                                            type="submit"
                                            variant="contained"
                                            loadingIndicator="Grading..."
                                            loading={isLoading}
                                        >
                                            Grade
                                        </LoadingButton >
                                    </Stack>
                                </form>
                            </>
                        }
                    </Stack>
                }
            </CardContent>
        </Card >
    )
}


export default Submission
