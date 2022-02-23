import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import BasicModal from "../BasicModal";
import EditAssignment from "./EditAssignment";
import useCreateEditDateTime from "../../hooks/useCreateEditDateTime";
import useCreateDateTime from "../../hooks/useCreateDateTime";


function Assignment({ assignment, onEdit, onDelete }) {
    const [editing, setEditing] = useState(false)
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })
    const { user } = useUser()
    const { code } = useParams()
    const createdDateTime = useCreateEditDateTime(assignment.created_at, assignment.edited_at)
    const dueDateTime = useCreateDateTime(assignment.due_date_time)

    useEffect(() => {
        setContextMenu(
            {
                allowEdit: user.role === 'teacher',
                allowDelete: user.role === 'teacher'
            }
        )
    }, [user.role])


    const editAssginment = async (title, text, due_date_time) => {
        onEdit(assignment.id, title, text, due_date_time)
        setEditing(false)
    }


    return (
        <>
            {
                <BasicModal open={editing} setOpen={setEditing} >
                    <span>
                        <EditAssignment assignment_id={assignment.id} onSubmit={editAssginment} />
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

                        {contextMenu.allowDelete && <Button onClick={() => onDelete(assignment.id)}> Delete </Button>}

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
