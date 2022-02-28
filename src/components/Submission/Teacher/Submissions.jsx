import { useState } from "react"
import { useParams } from "react-router-dom"
import { useAssignmentPoints } from "../../../hooks/api/useAssignment"
import useSubmissions from "../../../hooks/api/useSubmissions"
import SimpleSnackbar from "../../SimpleSnackbar"
import Submission from "./Submission"


function Submissions() {
    const [newDataAvailable, setNewDataAvailable] = useState(true)
    const [error, setError] = useState(false)
    const { code, assignment_id } = useParams()
    const { data: submissions, isLoading } = useSubmissions(code, assignment_id)
    const { data: totalPoints } = useAssignmentPoints(code, assignment_id)

    const gradeSubmission = async (id, points) => {
        const options = {
            method: 'PUT',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ points })
        }

        const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments/${assignment_id}/submissions/${id}`, options)

        if (response.status === 400) {
            const data = await response.json()
            setError(data.points)
            return false
        }
        setNewDataAvailable(true)
        return true
    }


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <SimpleSnackbar
                message={error}
                open={error.length > 0}
                setOpen={setError}
            />

            <h1> Submissions </h1>
            {submissions.map(submission =>
                <Submission
                    key={submission.student.email}
                    submission={submission}
                    gradeSubmission={gradeSubmission}
                    totalPoints={totalPoints}
                />
            )}
        </div>
    )
}


export default Submissions
