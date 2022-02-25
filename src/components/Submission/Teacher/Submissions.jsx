import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Submission from "./Submission"


function Submissions() {
    const [submissions, setSubmissions] = useState([])
    const [newDataAvailable, setNewDataAvailable] = useState(true)
    const { code, assignment_id } = useParams()

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
        setNewDataAvailable(true)
    }


    useEffect(() => {
        const fetchSubmissions = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments/${assignment_id}/submissions`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setSubmissions(data)
            setNewDataAvailable(false)
        }

        if (newDataAvailable)
            fetchSubmissions()
    }, [code, assignment_id, newDataAvailable])


    return (
        <div>
            <h1> Submissions </h1>
            {submissions.map(submission =>
                <Submission
                    key={submission.student.email}
                    submission={submission}
                    gradeSubmission={gradeSubmission}
                />
            )}
        </div>
    )
}


export default Submissions
