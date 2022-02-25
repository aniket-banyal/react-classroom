import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useCreateDateTime from "../../../hooks/useCreateDateTime"
import CreateSubmission from "./CreateSubmission"


function StudentSubmission({ totalPoints }) {
    const [submission, setSubmission] = useState()
    const [newDataAvailable, setNewDataAvailable] = useState(true)
    const { code, assignment_id } = useParams()
    const submittedDateTime = useCreateDateTime(submission?.created_at)


    useEffect(() => {
        const fetchSubmission = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments/${assignment_id}/student_submission`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setSubmission(data)
            setNewDataAvailable(false)
        }

        if (newDataAvailable)
            fetchSubmission()
    }, [code, assignment_id, newDataAvailable])


    const createNewSubmission = async (url) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ url })
        }

        const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments/${assignment_id}/submissions`, options)
        setNewDataAvailable(true)
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
                            <CreateSubmission onSubmit={createNewSubmission} />
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
