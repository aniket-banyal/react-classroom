import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import useCreateDateTime from "../../../hooks/useCreateDateTime"


function Submission({ submission, gradeSubmission, totalPoints }) {
    const [showGradingInp, setShowGradingInp] = useState(false)
    const [points, setPoints] = useState('')
    const submittedAt = useCreateDateTime(submission.submission?.created_at)

    const handleSubmit = async e => {
        e.preventDefault()
        const success = await gradeSubmission(submission.submission.id, points)
        if (success)
            setShowGradingInp(false)
    }

    useEffect(() => {
        if (submission.submission)
            setShowGradingInp(
                !submission.submission.points &&
                (submission.status === 'Done' || submission.status === 'Submitted Late')
            )
    }, [submission.status])


    return (
        <Box sx={{ borderBottom: 1, borderColor: 'black', padding: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <p> {submission.student.name} </p>
                <div>
                    <p> {submission.status} </p>
                    <p> {submittedAt} </p>
                </div>
            </div>
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
                        <form onSubmit={handleSubmit} >
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
                </>
            }
        </Box>
    )
}


export default Submission
