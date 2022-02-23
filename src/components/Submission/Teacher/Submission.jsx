import { Box } from "@mui/material"
import useCreateDateTime from "../../../hooks/useCreateDateTime"


function Submission({ submission }) {
    const submittedAt = useCreateDateTime(submission.submission?.created_at)

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <p> {submission.student.name} </p>
                <div>
                    <p> {submission.status} </p>
                    <p> {submittedAt} </p>
                </div>
            </div>
            {submission.submission && <pre> {submission.submission.text} </pre>}
        </Box>
    )
}


export default Submission
