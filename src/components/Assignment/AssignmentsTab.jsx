import { useState } from "react"
import Assignment from "./Assignment"
import CreateAssignment from "./CreateAssignment"
import SimpleSnackbar from "../SimpleSnackbar"
import { useParams } from "react-router-dom"
import useUser from "../../hooks/useUser"
import useAssignments from "../../hooks/api/useAssignments"


function AssignmentsTab() {
    const [error, setError] = useState(false)
    const { code } = useParams()
    const { user } = useUser()
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

            {user.role === 'teacher' && <CreateAssignment onError={onError} />}

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
