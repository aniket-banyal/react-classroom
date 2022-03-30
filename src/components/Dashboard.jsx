import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@mui/material"
import { Outlet } from "react-router-dom"
import BasicTabs from "./BasicTabs"
import { Typography } from '@mui/material';
import useClassroom from "../hooks/api/useClassroom";
import { useEffect } from "react";
import CenteredCircularProgress from './CenteredCircularProgress'


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
        return <CenteredCircularProgress />
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
            <Card
                sx={{ mb: 2 }}
            >
                <CardContent>
                    <Typography variant="h4" color='primary'>
                        {classroom.name}
                    </Typography>

                    <Typography variant='h6' gutterBottom>
                        Subject: {classroom.subject}
                    </Typography>

                    <Typography variant='subtitle2'>
                        Teacher: {classroom.teacher.name}
                    </Typography>

                    <Typography variant='subtitle2'>
                        Code: {classroom.code}
                    </Typography>
                </CardContent>
            </Card>

            <BasicTabs tabs={tabs} />
            <Outlet />
        </>
    )
}

export default Dashboard
