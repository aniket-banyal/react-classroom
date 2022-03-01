import { useState } from "react"
import Assignment from "./Assignment"
import CreateAssignment from "./CreateAssignment"
import { useParams } from "react-router-dom"
import useAssignments from "../../hooks/api/useAssignments"
import useUserRole from "../../hooks/api/useUserRole"


function AssignmentsTab() {
    const [error, setError] = useState(false)
    const { code } = useParams()
    const { data: userRole } = useUserRole(code)
    const { data: assignments, isLoading } = useAssignments(code)


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            {userRole === 'teacher' && <CreateAssignment />}

            {assignments.length > 0 ?
                <>
                    {
                        assignments.map(assignment => {
                            return (
                                <Assignment
                                    key={assignment.id}
                                    assignment={assignment}
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
