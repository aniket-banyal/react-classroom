import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { addErrorToast } from "../../../helpers/addToast"
import { useAssignmentPoints } from "../../../hooks/api/useAssignment"
import useGradeSubmission from "../../../hooks/api/useGradeSubmission"
import useCreateDateTime from "../../../hooks/useCreateDateTime"
import UserAvatar from '../../UserAvatar';


function Submission({ submission }) {
    const [showGradingInp, setShowGradingInp] = useState(false)
    const [points, setPoints] = useState('')
    const { code, assignment_id } = useParams()
    const submittedAt = useCreateDateTime(submission.submission?.created_at)
    const { data: totalPoints } = useAssignmentPoints(code, assignment_id)
    const { mutate } = useGradeSubmission()

    const handleSubmit = async e => {
        e.preventDefault()
        const body = { points }

        mutate({ code, assignmentId: assignment_id, submissionId: submission.submission.id, body }, {
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
        if (submission.submission)
            setShowGradingInp(
                !submission.submission.points &&
                (submission.status === 'Done' || submission.status === 'Submitted Late')
            )
    }, [submission.status])


    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <UserAvatar name={submission.fullName} />
                        <Typography variant='h6'>
                            {submission.fullName}
                        </Typography>
                    </Stack>

                    <Box>
                        <Typography variant='subtitle1'>
                            {submission.status}
                        </Typography>

                        <Typography variant='subtitle2'>
                            {submittedAt}
                        </Typography>
                    </Box>
                </Stack>

                {submission.submission &&
                    <Box
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
                            <form onSubmit={handleSubmit}>
                                <label> {`Grade (out of ${totalPoints})`} : </label>
                                <input
                                    type="number"
                                    placeholder='Points'
                                    min={0}
                                    max={totalPoints}
                                    value={points}
                                    onChange={e => setPoints(e.target.value)}
                                />

                                <input type="submit" value='Grade' />
                            </form>
                        }

                        {submission.submission.points && <p> Graded: {`${submission.submission.points}/${totalPoints}`} points</p>}
                    </Box>
                }
            </CardContent>
        </Card >
    )
}


export default Submission
