import { Button, Grid, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import useGradeSubmission from "../../../hooks/api/useGradeSubmission"
import useSubmissions from "../../../hooks/api/useSubmissions"
import useUserRole from "../../../hooks/api/useUserRole"
import Submission from "./Submission"


function Submissions() {
    const [rows, setRows] = useState([])
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null)
    const { code, assignment_id } = useParams()
    const { data: submissions, isLoading } = useSubmissions(code, assignment_id)
    const { data: userRole } = useUserRole(code)
    const { mutate } = useGradeSubmission()

    const columns = useMemo(() => {
        let cols = [
            {
                field: 'fullName',
                headerName: 'Full name',
                width: 160,
            },
            {
                field: 'email',
                headerName: 'Email',
                type: 'string',
                width: 300,
            },
            {
                field: 'status',
                headerName: 'Status',
                type: 'string',
                width: 150,
            },
            {
                field: 'grade',
                headerName: 'Grade',
                type: 'string',
                width: 100,
                renderCell: ({ row }) => {
                    if (row.status === 'Graded')
                        return row.grade
                    return '-'
                }
            },
            {
                field: 'submission',
                headerName: 'Submission',
                type: 'string',
                width: 150,
                renderCell: ({ row }) => {
                    if (row.status === 'Done' || row.status === 'Submitted Late' || row.status === 'Graded') {
                        return (
                            <Button
                                onClick={() => setSelectedSubmissionId(row.id)}
                            >
                                Submission
                            </Button>
                        )
                    }
                    return '-'
                }
            },
        ]

        return cols
    }, [mutate, userRole, code])

    useEffect(() => {
        if (!submissions)
            return

        let rows = []
        submissions.forEach(submission => {
            let newRow = {
                id: submission.student.email,
                fullName: submission.student.name,
                email: submission.student.email,
                status: submission.status,
                grade: submission.submission?.points,
                submission: submission.submission
            }

            rows.push(newRow)
        })
        setRows(rows)
    }, [submissions])


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={8}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    disableColumnMenu
                    autoHeight
                />
            </Grid>

            <Grid item xs={4}>
                {selectedSubmissionId &&
                    <Submission submission={submissions.find(submission => submission.student.email === selectedSubmissionId
                    )} />
                }
            </Grid >
        </Grid >
    )
}


export default Submissions
