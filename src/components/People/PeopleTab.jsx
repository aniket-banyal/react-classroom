import { useParams } from "react-router-dom"
import useStudents from "../../hooks/api/useStudents"
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import useRemoveStudent from "../../hooks/api/useRemoveStudent";
import useUserRole from "../../hooks/api/useUserRole";
import DeleteIcon from '@mui/icons-material/Delete';


function PeopleTab() {
    const { code } = useParams()
    const { data: students, isLoading } = useStudents(code)
    const [rows, setRows] = useState([])
    const { mutate } = useRemoveStudent()
    const { data: userRole } = useUserRole(code)


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
        ]

        if (userRole === 'teacher')
            cols.push(
                {
                    field: 'actions',
                    type: 'actions',
                    width: 80,
                    getActions: (params) => [
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Remove"
                            onClick={() => {
                                mutate({ code, email: params.id })
                            }}
                        />
                    ]
                }
            )

        return cols
    }, [mutate, userRole, code])


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
            <Typography variant='h6'>
                Students
            </Typography>

            <DataGrid
                rows={rows}
                columns={columns}
                disableSelectionOnClick
                disableColumnMenu
                autoHeight
            />
        </>
    )
}


export default PeopleTab
