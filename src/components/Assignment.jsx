import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getDateAndTimeInLocale } from "../helpers/dateTime";
import { Link } from "react-router-dom";


function Assignment({ assignment, code, onEdit, onDelete, role }) {
    const [createdDateTime, setCreatedDateTime] = useState()
    const [dueDateTime, setDueDateTime] = useState()

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


    return (
        <>
            <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
                <Link to={`/classes/${code}/assignments/${assignment.id}`}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                        <div>
                            <h1> {assignment.title} </h1>
                            <p> Posted at - {createdDateTime} </p>
                            <p> Due date - {dueDateTime} </p>
                        </div>
                    </div>
                </Link>
            </Box>
        </>
    )
}

export default Assignment
