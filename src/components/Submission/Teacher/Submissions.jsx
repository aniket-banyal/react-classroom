import { useState } from "react"
import { useParams } from "react-router-dom"
import { useAssignmentPoints } from "../../../hooks/api/useAssignment"
import useSubmissions from "../../../hooks/api/useSubmissions"
import SimpleSnackbar from "../../SimpleSnackbar"
import Submission from "./Submission"


function Submissions() {
    const [error, setError] = useState(false)
    const { code, assignment_id } = useParams()
    const { data: submissions, isLoading } = useSubmissions(code, assignment_id)
    const { data: totalPoints } = useAssignmentPoints(code, assignment_id)


    const onError = (error) => {
        setError(error.points)
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
                    onError={onError}
                    totalPoints={totalPoints}
                />
            )}
        </div>
    )
}


export default Submissions
