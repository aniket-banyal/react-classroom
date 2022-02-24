import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import SidebarClassroomCard from './SidebarClassroomCard';
import { Typography } from '@mui/material';


function Sidebar({ toggleDrawer }) {
    const [enrolledClassrooms, setEnrolledClassrooms] = useState([])
    const [teachingClassrooms, setTeachingClassrooms] = useState([])

    useEffect(() => {
        const fetchEnrolledClassroom = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes_enrolled`, options)
            const data = await response.json()
            setEnrolledClassrooms(data)
        }
        fetchEnrolledClassroom()
    }, [])

    useEffect(() => {
        const fetchTeachingClassroom = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes_teaching`, options)
            const data = await response.json()
            setTeachingClassrooms(data)
        }
        fetchTeachingClassroom()
    }, [])


    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
        >
            <Typography sx={{ margin: 1 }}> Enrolled </Typography>
            <List>
                {enrolledClassrooms.map(classroom => <SidebarClassroomCard key={classroom.code} classroom={classroom} />)}
            </List>

            <Divider />

            <Typography sx={{ margin: 1 }}> Teaching </Typography>
            <List>
                {teachingClassrooms.map(classroom => <SidebarClassroomCard key={classroom.code} classroom={classroom} />)}
            </List>
        </Box>
    )
}


export default Sidebar
