import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser"
import StudentSubmission from "../Submission/Student/StudentSubmission";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";
import useAssignment from "../../hooks/api/useAssignment";


function AssignmentDetail() {
    const { code, assignment_id } = useParams()
    const { user } = useUser()
    const { data: assignment, isLoading } = useAssignment(code, assignment_id)
    const createdDateTime = useCreateEditDateTime(assignment?.created_at, assignment?.edited_at)
    const dueDateTime = useCreateDateTime(assignment?.due_date_time)


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            {assignment ?
                <>
                    <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <h1> {assignment.title} </h1>
                                <p> {assignment.points} points</p>
                            </div>

                            <div>
                                <p> Posted at - {createdDateTime} </p>
                                <p> Due date - {dueDateTime} </p>
                            </div>
                        </div>
                        <pre> {assignment.text} </pre>
                    </Box>
                    {user.role === 'student' && <StudentSubmission totalPoints={assignment.points} />}
                </>
                :
                <h1>Loading...</h1>
            }
        </>
    )
}

export default AssignmentDetail
