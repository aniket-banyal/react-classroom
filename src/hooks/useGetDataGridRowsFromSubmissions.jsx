import { useEffect, useState } from "react"

export default function useGetDataGridRowsFromSubmissions(submissions) {
    const [rows, setRows] = useState([])

    useEffect(() => {
        if (!submissions)
            setRows([])

        else {
            setRows(
                submissions.map(submission => {
                    return {
                        id: submission.student.id,
                        fullName: submission.student.name,
                        email: submission.student.email,
                        status: submission.status,
                        grade: submission.submission?.points,
                        submission: submission.submission
                    }
                })
            )
        }
    }, [submissions])

    return rows
}
