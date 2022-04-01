import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import SidebarClassroomCard from './SidebarClassroomCard';
import { ListItemButton, ListItemText } from '@mui/material';
import useUser from '../../hooks/api/useUser';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import useClassrooms from '../../hooks/api/useClassrooms';
import CenteredCircularProgress from '../CenteredCircularProgress';
import SidebarClassroom from './SidebarClassroom';


const width = 300
function Sidebar({ toggleDrawer }) {
    const [classrooms, setClassrooms] = useState({ teachingClassrooms: [], enrolledClassrooms: [] })
    const { data: allClassrooms, isLoading, isError, error } = useClassrooms()
    const { data: user } = useUser()

    useEffect(() => {
        if (!allClassrooms)
            return

        const teachingClassrooms = allClassrooms.filter(classroom => classroom.teacher.email === user?.email)
        const enrolledClassrooms = allClassrooms.filter(classroom => !teachingClassrooms.includes(classroom))
        setClassrooms({ teachingClassrooms, enrolledClassrooms })
    }, [allClassrooms, user?.email])


    return (
        <Box
            sx={{ width }}
            role="presentation"
            onClick={toggleDrawer}
        >
            <ListItemButton component={Link} to={`/`}>
                <HomeIcon sx={{ mr: 2, my: 1 }} />
                <ListItemText primary='Classes' />
            </ListItemButton>

            <Divider />

            {isLoading ?
                <CenteredCircularProgress />
                :
                <>
                    <SidebarClassroom
                        classrooms={classrooms.enrolledClassrooms}
                        title='Enrolled'
                        maxWidth={width / 1.6}
                    />

                    <Divider />

                    <SidebarClassroom
                        classrooms={classrooms.teachingClassrooms}
                        title='Teaching'
                        maxWidth={width / 1.6}
                    />
                </>
            }

        </Box>
    )
}


export default Sidebar
