import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Submission from "./Submission"


function Submissions() {
    const { code, assignment_id } = useParams()
    const [submissions, setSubmissions] = useState([])


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
        }
        fetchSubmissions()
    }, [code, assignment_id])


    return (
        <div>
            <h1> Submissions </h1>
            {submissions.map(submission => <Submission key={submission.id} submission={submission} />)}
        </div>
    )
}


export default Submissions
