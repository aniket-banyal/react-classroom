import { useNavigate, useParams } from "react-router-dom"
import { useStudents, useStudentsCount } from "../../hooks/api/useStudents"
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import useRemoveStudent from "../../hooks/api/useRemoveStudent";
import useUserRole from "../../hooks/api/useUserRole";
import DeleteIcon from '@mui/icons-material/Delete';
import CenteredCircularProgress from "../CenteredCircularProgress";


function PeopleTab() {
    const { code } = useParams()
    const navigate = useNavigate()
    const { data: students, isLoading } = useStudents(code)
    const { data: studentsCount } = useStudentsCount(code)
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
                                mutate({ code, id: params.id })
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
            rows.push({ id: student.id, fullName: student.name, email: student.email })
        })
        setRows(rows)
    }, [students])


    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <Stack spacing={2}>
            <Stack direction='row' alignItems='flex-end' justifyContent='space-between' >
                <Typography
                    variant='h4'
                    color='primary'
                >
                    Students
                </Typography>

                <Typography
                    variant='subtitle1'
                    color='primary'
                >
                    {studentsCount} students
                </Typography>
            </Stack>

            <DataGrid
                rows={rows}
                columns={columns}
                disableSelectionOnClick
                disableColumnMenu
                autoHeight
                onRowClick={userRole === 'teacher' ? row => navigate(`/${code}/students/${row.id}`) : null}
            />
        </Stack>
    )
}


export default PeopleTab
