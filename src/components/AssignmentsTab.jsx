import { useEffect, useState } from "react"
import Assignment from "./Assignment"
import CreateAssignment from "./CreateAssignment"

function AssignmentsTab({ code, role }) {
    const [assignments, setAssignments] = useState([])
    const [newDataAvailable, setNewDataAvailable] = useState(true)

    const createNewAssignment = async (title, text, due_date_time) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ title, text, due_date_time })
        }

        const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments`, options)
        setNewDataAvailable(true)
    }

    useEffect(() => {
        const fetchAssignments = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setAssignments(data)
            setNewDataAvailable(false)
        }
        if (newDataAvailable)
            fetchAssignments()
    }, [code, newDataAvailable])


    return (
        <>
            {role == 'teacher' && <CreateAssignment onSubmit={createNewAssignment} />}

            {assignments.length > 0 ?
                <>
                    {
                        assignments.map(assignment => {
                            return (
                                <Assignment
                                    key={assignment.id}
                                    assignment={assignment}
                                    code={code}
                                    role={role}
                                />
                            )
                        })
                    }
                </> :
                <h1>No Assignments</h1>
            }
        </>
    )

}

export default AssignmentsTab
