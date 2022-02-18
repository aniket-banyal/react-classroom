import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BasicModal from "./BasicModal";
import CommentSection from "./CommentSection";
import useUser from '../hooks/useUser'
import { getDateAndTimeInLocale } from "../helpers/dateTime";


function Assignment({ assignment, code, onEdit, onDelete, role }) {
    const [dateTime, setDateTime] = useState()

    useEffect(() => {
        const createdAt = new Date(assignment.created_at)
        // const editedAt = new Date(assignment.edited_at)
        const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)

        // if (createdAt.getTime() == editedAt.getTime()) {
        setDateTime(`${createdDate} - ${createdTime}`)
        // }
        // else {
        //     const [editedDate, editedTime] = getDateAndTimeInLocale(editedAt)
        //     setDateTime(`${createdDate} - ${createdTime} (Edited at - ${editedDate} - ${editedTime})`)
        // }

    }, [assignment.created_at, assignment.edited_at])


    return (
        <>
            <Box sx={{ border: 1, borderColor: 'black', marginTop: 5 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                    <div>
                        <h1> {assignment.title} </h1>
                        <p> {dateTime} </p>
                    </div>
                </div>
                <pre> {assignment.text} </pre>
            </Box>
        </>
    )
}

export default Assignment
