import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import BasicTabs from "./BasicTabs"
import { Typography } from '@mui/material';
import useClassroom from "../hooks/api/useClassroom";
import { useEffect } from "react";


const tabs = [
    {
        label: 'Announcements',
        link: ''
    },
    {
        label: 'Assignments',
        link: 'assignments'
    },
    {
        label: 'People',
        link: 'people'
    }
]


function Dashboard() {
    const { code } = useParams()
    const { data: classroom, isLoading, isError } = useClassroom(code)

    useEffect(() => {
        //when going to some other class using sidebar, scroll state may remain same because the child components don't re-render if data comes from cache (react-query)
        window.scrollTo({ top: 0 })
    }, [classroom])


    if (isLoading) {
        return (
            <h1> Loading... </h1>
        )
    }

    if (isError)
        return (
            <div>
                <h1>Invalid class code</h1>
                <Link to='/'>Back to Classes</Link>
            </div>
        )

    return (
        <>
            <Box>
                <Box sx={{ border: 1, borderColor: 'divider', marginTop: 5, marginBottom: 5 }}>
                    <Typography variant="h2" > {classroom.name} </Typography>
                    <p> Subject: {classroom.subject} </p>
                    <p> Teacher: {classroom.teacher.name} </p>
                    <p> Code: {classroom.code} </p>
                </Box>
            </Box>
            <BasicTabs tabs={tabs} />
            <Outlet />
        </>
    )

}

export default Dashboard
