import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import SidebarClassroomCard from './SidebarClassroomCard';
import { Typography } from '@mui/material';
import useClassrooms from '../hooks/useClassrooms';
import useUser from '../hooks/useUser';


function Sidebar({ toggleDrawer }) {
    const [classrooms, setClassrooms] = useState({ teachingClassrooms: [], enrolledClassrooms: [] })
    const allClassrooms = useClassrooms()
    const { user } = useUser()

    useEffect(() => {
        const teachingClassrooms = allClassrooms.filter(classroom => classroom.teacher.email === user.email)
        const enrolledClassrooms = allClassrooms.filter(classroom => !teachingClassrooms.includes(classroom))
        setClassrooms({ teachingClassrooms, enrolledClassrooms })
    }, [allClassrooms, user.email])


    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
        >
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
        </Box>
    )
}


export default Sidebar
