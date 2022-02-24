import { Box, Button } from "@mui/material"
import useCreateDateTime from "../../../hooks/useCreateDateTime"


function Submission({ submission }) {
    const submittedAt = useCreateDateTime(submission.submission?.created_at)

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
                <Button
                    variant="contained"
                    target="_blank"
                    href={submission.submission.url}
                >
                    Submission
                </Button>
            }
        </Box>
    )
}


export default Submission
