import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import SidebarClassroomCard from './SidebarClassroomCard';
import { ListItemButton, ListItemText, Typography } from '@mui/material';
import useUser from '../../hooks/api/useUser';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import useClassrooms from '../../hooks/api/useClassrooms';
import CenteredCircularProgress from '../CenteredCircularProgress';


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
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
        >
            <ListItemButton component={Link} to={`/`} sx={{ mb: 2 }}>
                <HomeIcon sx={{ mr: 2 }} />
                <ListItemText primary='Classes' />
            </ListItemButton>

            <Divider />

            {isLoading ?
                <CenteredCircularProgress />
                :
                <>
                    <Typography sx={{ margin: 1 }}> Enrolled </Typography>
                    <List>
                        {classrooms.enrolledClassrooms.map(classroom =>
                            <SidebarClassroomCard
                                key={classroom.code}
                                classroom={classroom}
                            />
                        )}
                    </List>

                    <Divider />

                    <Typography sx={{ margin: 1 }}> Teaching </Typography>
                    <List>
                        {classrooms.teachingClassrooms.map(classroom =>
                            <SidebarClassroomCard
                                key={classroom.code}
                                classroom={classroom}
                            />
                        )}
                    </List>
                </>
            }

        </Box>
    )
}


export default Sidebar
