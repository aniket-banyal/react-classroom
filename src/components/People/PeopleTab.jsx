import { useParams } from "react-router-dom"
import useStudents from "../../hooks/api/useStudents"
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import useRemoveStudent from "../../hooks/api/useRemoveStudent";
import useUserRole from "../../hooks/api/useUserRole";
import { LoadingButton } from "@mui/lab";


const columns = [
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
    }
]


function PeopleTab() {
    const { code } = useParams()
    const { data: students, isLoading } = useStudents(code)
    const [rows, setRows] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const { mutate, isLoading: isRemoving } = useRemoveStudent()
    const { data: userRole } = useUserRole(code)

    const handleSelectionChange = (selectionModel) => {
        setSelectedRows(rows.filter(row => selectionModel.includes(row.id)))
    }

    const handleDelete = () => {
        selectedRows.forEach(selectedRow => mutate({ code, email: selectedRow.email }))
        setRows(rows.filter(row => !selectedRows.includes(row)))
    }

    useEffect(() => {
        if (!students)
            return

        let rows = []
        students.forEach(student => {
            rows.push({ id: student.email, fullName: student.name, email: student.email })
        })
        setRows(rows)
    }, [students])


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ mb: 2 }}
            >
                <Typography variant='h6'>
                    Students
                </Typography>

                <>
                    {userRole === 'teacher' &&
                        selectedRows.length > 0 &&
                        <LoadingButton
                            variant="contained"
                            loadingIndicator="Removing..."
                            loading={isRemoving}
                            onClick={handleDelete}
                        >
                            Remove
                        </LoadingButton >
                    }
                </>
            </Stack>

            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={userRole === 'teacher'}
                disableSelectionOnClick
                disableColumnMenu
                autoHeight
                onSelectionModelChange={handleSelectionChange}
            />
        </>
    )
}


export default PeopleTab
