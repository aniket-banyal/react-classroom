import Assignment from "./Assignment"
import CreateAssignment from "./CreateAssignment"
import { useParams } from "react-router-dom"
import useAssignments from "../../hooks/api/useAssignments"
import useUserRole from "../../hooks/api/useUserRole"
import { Stack, Typography } from "@mui/material"


function AssignmentsTab() {
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
            {userRole === 'teacher' &&
                <CreateAssignment />
            }

            {assignments.length > 0 ?
                <Stack spacing={3}>
                    {assignments.map(assignment =>
                        <Assignment
                            key={assignment.id}
                            assignment={assignment}
                        />
                    )}
                </Stack>
                :
                <Typography variant='h4'>No Assignments</Typography>
            }
        </>
    )

}

export default AssignmentsTab
