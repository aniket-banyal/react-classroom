import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDateAndTimeInLocale } from "../../../helpers/dateTime"
import CreateSubmission from "./CreateSubmission"


const getSubmittedDate = (submission) => {
    const submittedDateTime = new Date(submission.created_at)
    const [submittedDate, submittedTime] = getDateAndTimeInLocale(submittedDateTime)

    return `${submittedDate} - ${submittedTime}`
}

function StudentSubmission() {
    const [submission, setSubmission] = useState()
    const [submittedDateTime, setSubmittedDateTime] = useState()
    const [newDataAvailable, setNewDataAvailable] = useState(true)
    const { code, assignment_id } = useParams()


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
            setSubmittedDateTime(getSubmittedDate(data))
            setNewDataAvailable(false)
        }

        if (newDataAvailable)
            fetchSubmission()
    }, [code, assignment_id, newDataAvailable])


    const createNewSubmission = async (text) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ text })
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

                    {(submission.status === 'Done' || submission.status === 'Submitted Late') &&
                        <>
                            <p> {submittedDateTime}</p>
                            <Box sx={{ border: 1, padding: 2 }}>
                                <pre> {submission.text}</pre>
                            </Box>
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
