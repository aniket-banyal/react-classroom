import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { useParams } from "react-router-dom"
import useStudentSubmission from "../../../hooks/api/useStudentSubmission"
import useCreateDateTime from "../../../hooks/useCreateDateTime"
import CreateSubmission from "./CreateSubmission"


function StudentSubmission({ totalPoints }) {
    const { code, assignment_id } = useParams()
    const { data: submission, isLoading } = useStudentSubmission(code, assignment_id)
    const submittedDateTime = useCreateDateTime(submission?.created_at)


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            {submission ?
                <>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <h2>Your Work</h2>
                        <p>{submission.status}</p>
                    </div>

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
                :
                <h1> Loading... </h1>
            }
        </>
    )
}


export default StudentSubmission
