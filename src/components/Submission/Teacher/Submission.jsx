import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAssignmentPoints } from "../../../hooks/api/useAssignment"
import useCreateDateTime from "../../../hooks/useCreateDateTime"
import SubmissionStatus from "../../SubmissionStatus"
import NameAvatar from '../../NameAvatar';
import GradeSubmission from "./GradeSubmission"


function Submission({ submission }) {
    const [showGradingInp, setShowGradingInp] = useState(false)
    const { code, assignmentId } = useParams()
    const submittedAt = useCreateDateTime(submission?.submission?.created_at)
    const { data: totalPoints } = useAssignmentPoints(code, assignmentId)


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
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>

                        <Stack direction='row' alignItems='center' spacing={2}>
                            <NameAvatar name={submission.student.name} />
                            <Typography variant='h6'>
                                {submission.student.name}
                            </Typography>
                        </Stack>

                        <SubmissionStatus status={submission.status} />
                    </Stack>

                    {submission.submission.points &&
                        <Typography variant='subtitle2'>
                            {`${submission.submission.points}/${totalPoints}`}
                        </Typography>
                    }

                    <Typography variant='subtitle2'>
                        {submittedAt}
                    </Typography>

                    {submission.submission &&
                        <>
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

                                    <GradeSubmission
                                        submissionId={submission.submission.id}
                                        onSubmit={() => setShowGradingInp(false)}
                                    />
                                </>
                            }
                        </>
                    }
                </Stack>
            </CardContent>
        </Card>
    )
}


export default Submission
