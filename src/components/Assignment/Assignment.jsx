import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUserRole from "../../hooks/api/useUserRole";
import BasicModal from "../BasicModal";
import EditAssignment from "./EditAssignment";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";
import useDeleteAssignment from "../../hooks/api/useDeleteAssignment";


function Assignment({ assignment, onError }) {
    const [editing, setEditing] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })
    const { code } = useParams()
    const { data: userRole } = useUserRole(code)
    const createdDateTime = useCreateEditDateTime(assignment.created_at, assignment.edited_at)
    const dueDateTime = useCreateDateTime(assignment.due_date_time)
    const { mutate } = useDeleteAssignment()


    useEffect(() => {
        setContextMenu(
            {
                allowEdit: userRole === 'teacher',
                allowDelete: userRole === 'teacher'
            }
        )
    }, [userRole])


    const onEdit = () => setEditing(false)

    const onDelete = () => {
        mutate({ code, assignmentId: assignment.id })
    }


    return (
        <>
            {
                <BasicModal open={editing} setOpen={setEditing} >
                    <span>
                        <EditAssignment assignmentId={assignment.id} onSubmit={onEdit} onError={onError} />
                    </span>
                </BasicModal>
            }

            <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                        <div>
                            <h1> {assignment.title} </h1>
                            <p> Posted at - {createdDateTime} </p>
                            <p> Due date - {dueDateTime} </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {contextMenu.allowEdit && <Button onClick={() => setEditing(true)}> Edit </Button>}

                        {contextMenu.allowDelete && <Button onClick={onDelete}> Delete </Button>}

                        <Link to={`/${code}/assignments/${assignment.id}`}>
                            <Button> Details </Button>
                        </Link>
                    </div>

                </div>
            </Box>
        </>
    )
}

export default Assignment
