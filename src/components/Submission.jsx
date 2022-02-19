import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { getDateAndTimeInLocale } from "../helpers/dateTime"


const getDatePosted = (date) => {
    const createdAt = new Date(date)
    const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)

    return `${createdDate} - ${createdTime}`
}


function Submission({ submission }) {
    const [submittedAt, setSubmittedAt] = useState()

    useEffect(() => {
        setSubmittedAt(getDatePosted(submission.created_at))
    }, [submission.created_at])

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
            <p> {submission.student.name} </p>
            <p> {submittedAt} </p>
            <pre> {submission.text} </pre>
        </Box>
    )
}


export default Submission
