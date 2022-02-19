import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getDateAndTimeInLocale } from "../helpers/dateTime";
import { useParams } from "react-router-dom";

const getDatePosted = (assignment) => {
    const createdAt = new Date(assignment.created_at)
    // const editedAt = new Date(assignment.edited_at)
    const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)

    // if (createdAt.getTime() == editedAt.getTime()) {
    return `${createdDate} - ${createdTime}`
    // }
    // else {
    //     const [editedDate, editedTime] = getDateAndTimeInLocale(editedAt)
    // return `${createdDate} - ${createdTime} (Edited at - ${editedDate} - ${editedTime})`
    // }
}

const getDueDate = (assignment) => {
    const dueDateTime = new Date(assignment.due_date_time)
    const [dueDate, dueTime] = getDateAndTimeInLocale(dueDateTime)

    return `${dueDate} - ${dueTime}`
}

function AssignmentDetail() {
    const { code, assignment_id } = useParams()
    const [assignment, setAssignment] = useState()
    const [createdDateTime, setCreatedDateTime] = useState()
    const [dueDateTime, setDueDateTime] = useState()

    useEffect(() => {
        const fetchAssignment = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/assignments/${assignment_id}`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setAssignment(data)
            setCreatedDateTime(getDatePosted(data))
            setDueDateTime(getDueDate(data))
        }
        fetchAssignment()
    }, [code, assignment_id])


    return (
        <>
            {assignment ?
                <>
                    <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <div>
                                <h1> {assignment.title} </h1>
                                <p> Posted at - {createdDateTime} </p>
                                <p> Due date - {dueDateTime} </p>
                            </div>
                        </div>
                        <pre> {assignment.text} </pre>
                    </Box>
                    <div>
                        <h2>Your Work</h2>
                    </div>
                </>
                :
                <h1>Loading...</h1>
            }
        </>
    )
}

export default AssignmentDetail
