import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser"
import StudentSubmission from "../Submission/Student/StudentSubmission";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";


function AssignmentDetail() {
    const [assignment, setAssignment] = useState()
    const { code, assignment_id } = useParams()
    const { user } = useUser()
    const createdDateTime = useCreateEditDateTime(assignment?.created_at, assignment?.edited_at)
    const dueDateTime = useCreateDateTime(assignment?.due_date_time)


    useEffect(() => {
        const fetchAssignment = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments/${assignment_id}`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setAssignment(data)
        }
        fetchAssignment()
    }, [code, assignment_id])


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
                    {user.role === 'teacher' && <Link to='submissions'> Submissions </Link>}
                    {user.role === 'student' && <StudentSubmission />}
                </>
                :
                <h1>Loading...</h1>
            }
        </>
    )
}

export default AssignmentDetail
