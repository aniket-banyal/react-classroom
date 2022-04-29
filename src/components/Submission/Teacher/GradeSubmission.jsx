import { LoadingButton } from "@mui/lab"
import { useState } from "react"
import { Stack, TextField, Typography } from "@mui/material"
import { addErrorToast } from "../../../helpers/addToast"
import useGradeSubmission from "../../../hooks/api/useGradeSubmission"
import { useParams } from "react-router-dom"
import { useAssignmentPoints } from "../../../hooks/api/useAssignment"


function GradeSubmission({ submissionId, onSubmit }) {
    const [points, setPoints] = useState('')
    const { code, assignmentId } = useParams()
    const { mutate, isLoading } = useGradeSubmission()
    const { data: totalPoints } = useAssignmentPoints(code, assignmentId)

    const handleSubmit = async e => {
        e.preventDefault()
        const body = { points }

        mutate({ code, assignmentId, submissionId, body }, {
            onSuccess: () => {
                onSubmit()
                setPoints('')
            },
            onError: (error) => {
                const { status, data } = error.response
                if (status === 400)
                    addErrorToast(data.points[0])
            }
        })
    }

    return (
        <>
            <Typography variant='body1'>
                Grade Submission (out of {totalPoints})
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
    )
}

export default GradeSubmission
