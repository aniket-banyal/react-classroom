import { Button, Grid, } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useSubmissions from "../../../hooks/api/useSubmissions"
import useGetDataGridRowsFromSubmissions from "../../../hooks/useGetDataGridRowsFromSubmissions"
import SubmissionStatusSelect from "../../SubmissionStatusSelect"
import Submission from "./Submission"
import SubmissionsStats from "./SubmissionsStats"


function Submissions() {
    const { code, assignmentId, studentId } = useParams()
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(studentId ? Number(studentId) : null)
    const { data: submissions, isLoading } = useSubmissions(code, assignmentId)
    const rows = useGetDataGridRowsFromSubmissions(submissions)
    const [selectedStatus, setSelectedStatus] = useState('All')
    const navigate = useNavigate()

    const filteredRows = useMemo(() => {
        if (selectedStatus === 'All')
            return rows

        return rows.filter(row => row.status === selectedStatus)
    }, [rows, selectedStatus])

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
                                onClick={() => {
                                    navigate(`/${code}/assignments/${assignmentId}/submissions/${row.id}`)
                                    setSelectedSubmissionId(row.id)
                                }}
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
    }, [navigate])


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <SubmissionsStats submissions={submissions} />
            </Grid>
            <Grid item xs={2}>
                <SubmissionStatusSelect
                    value={selectedStatus}
                    onChange={(status) => setSelectedStatus(status)}
                />
            </Grid>

            <Grid item container spacing={4}>
                <Grid item xs={8}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        disableColumnMenu
                        autoHeight
                        selectionModel={selectedSubmissionId ? selectedSubmissionId : undefined}
                    />
                </Grid>

                <Grid item xs={4}>
                    {selectedSubmissionId &&
                        <Submission
                            submission={submissions.find(submission => submission.student.id === selectedSubmissionId)}
                        />
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}


export default Submissions
