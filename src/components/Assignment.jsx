import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getDateAndTimeInLocale } from "../helpers/dateTime";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";


function Assignment({ assignment, code, onEdit, onDelete }) {
    const [createdDateTime, setCreatedDateTime] = useState()
    const [dueDateTime, setDueDateTime] = useState()
    const { user } = useUser()
    const [contextMenu, setContextMenu] = useState({
        allowEdit: false,
        allowDelete: false
    })

    useEffect(() => {
        const createdAt = new Date(assignment.created_at)
        // const editedAt = new Date(assignment.edited_at)
        const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)

        // if (createdAt.getTime() == editedAt.getTime()) {
        setCreatedDateTime(`${createdDate} - ${createdTime}`)
        // }
        // else {
        //     const [editedDate, editedTime] = getDateAndTimeInLocale(editedAt)
        //     setCreatedDateTime(`${createdDate} - ${createdTime} (Edited at - ${editedDate} - ${editedTime})`)
        // }

    }, [assignment.created_at, assignment.edited_at])

    useEffect(() => {
        const dueDateTime = new Date(assignment.due_date_time)
        const [dueDate, dueTime] = getDateAndTimeInLocale(dueDateTime)

        setDueDateTime(`${dueDate} - ${dueTime}`)

    }, [assignment.due_date_time])

    useEffect(() => {
        setContextMenu(
            {
                allowEdit: user.role == 'teacher',
                allowDelete: user.role == 'teacher'
            }
        )
    }, [user.role])


    return (
        <>
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
                        {/* {contextMenu.allowEdit && <Button onClick={() => setEditing(true)}> Edit </Button>} */}

                        {contextMenu.allowDelete && <Button onClick={() => onDelete(assignment.id)}> Delete </Button>}

                        <Link to={`/classes/${code}/assignments/${assignment.id}`}>
                            <Button> Details </Button>
                        </Link>
                    </div>

                </div>
            </Box>
        </>
    )
}

export default Assignment
