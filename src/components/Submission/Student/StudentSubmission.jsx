import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { useParams } from "react-router-dom"
import useStudentSubmission from "../../../hooks/api/useStudentSubmission"
import useCreateDateTime from "../../../hooks/useCreateDateTime"
import CreateSubmission from "./CreateSubmission"
import { CircularProgress, Typography } from '@mui/material';


function StudentSubmission({ totalPoints }) {
    const { code, assignment_id } = useParams()
    const { data: submission, isLoading } = useStudentSubmission(code, assignment_id)
    const submittedDateTime = useCreateDateTime(submission?.created_at)


    return (
        <>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <h2>Your Work</h2>
            </div>

            {isLoading ?
                <CircularProgress />
                :
                <>
                    <p>{submission.status}</p>
                    {(submission.status === 'Done' || submission.status === 'Submitted Late' || submission.status === 'Graded') &&
                        <>
                            <p> {submittedDateTime}</p>
                            <Button
                                variant="contained"
                                target="_blank"
                                href={submission.url}
                            >
                                Submission
                            </Button>
                            {submission.points &&
                                <p>
                                    Graded: {`${submission.points}/${totalPoints}`} points
                                </p>
                            }
                        </>
                    }
                    {(submission.status === 'Assigned' || submission.status === 'Missing') &&
                        <Box sx={{ border: 1, padding: 2 }}>
                            <CreateSubmission />
                        </Box>
                    }
                </>
            }
        </>
    )
}


export default StudentSubmission
