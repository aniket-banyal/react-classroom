import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { getDateAndTimeInLocale } from "../../../helpers/dateTime"


const getDatePosted = (date) => {
    const createdAt = new Date(date)
    const [createdDate, createdTime] = getDateAndTimeInLocale(createdAt)

    return `${createdDate} - ${createdTime}`
}


function Submission({ submission }) {
    const [submittedAt, setSubmittedAt] = useState()

    useEffect(() => {
        if (submission.submission)
            setSubmittedAt(getDatePosted(submission.submission.created_at))
    }, [])

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <p> {submission.student.name} </p>
                <div>
                    <p> {submission.status} </p>
                    <p> {submittedAt} </p>
                </div>
            </div>
            {submission.submission && <pre> {submission.submission.text} </pre>}
        </Box>
    )
}


export default Submission
