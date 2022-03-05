import Assignment from "./Assignment"
import CreateAssignment from "./CreateAssignment"
import { useParams } from "react-router-dom"
import useAssignments from "../../hooks/api/useAssignments"
import useUserRole from "../../hooks/api/useUserRole"
import BasicModal from "../BasicModal"
import AddIcon from '@mui/icons-material/Add';
import { Fab, Stack, Typography } from "@mui/material"
import { useState } from "react"

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex: 10
}


function AssignmentsTab() {
    const [creating, setCreating] = useState(false)
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
                <>
                    <Fab
                        color="primary"
                        variant='extended'
                        style={style}
                        onClick={() => setCreating(true)}
                        focusRipple={false}
                    >
                        <AddIcon />
                        New Assignment
                    </Fab>

                    <BasicModal
                        open={creating}
                        setOpen={setCreating}
                        title='Create Assignment'
                    >
                        <CreateAssignment onSubmit={() => setCreating(false)} />
                    </BasicModal>
                </>
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
