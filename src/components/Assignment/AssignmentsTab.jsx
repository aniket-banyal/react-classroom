import { useState } from "react"
import Assignment from "./Assignment"
import CreateAssignment from "./CreateAssignment"
import SimpleSnackbar from "../SimpleSnackbar"
import { useParams } from "react-router-dom"
import useAssignments from "../../hooks/api/useAssignments"
import useUserRole from "../../hooks/api/useUserRole"


function AssignmentsTab() {
    const [error, setError] = useState(false)
    const { code } = useParams()
    const { data: userRole } = useUserRole(code)
    const { data: assignments, isLoading } = useAssignments(code)


    const onError = (error) => {
        const { status, data } = error.response
        if (status === 400) {
            setError(data.due_date_time)
            return
        }
    }


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <SimpleSnackbar
                message={error}
                open={error.length > 0}
                setOpen={setError}
            />

            {userRole === 'teacher' && <CreateAssignment onError={onError} />}

            {assignments.length > 0 ?
                <>
                    {
                        assignments.map(assignment => {
                            return (
                                <Assignment
                                    key={assignment.id}
                                    assignment={assignment}
                                    onError={onError}
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
