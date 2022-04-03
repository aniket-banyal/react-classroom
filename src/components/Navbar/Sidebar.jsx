import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import useEnrolledClassrooms from '../../hooks/api/useEnrolledClassrooms';
import useTeachingClassrooms from '../../hooks/api/useTeachingClassrooms';
import CenteredCircularProgress from '../CenteredCircularProgress';
import SidebarClassroom from './SidebarClassroom';


const width = 300
function Sidebar({ toggleDrawer }) {
    const { data: enrolledClassrooms, isLoading: isLoadingEnrolledClassroom } = useEnrolledClassrooms()
    const { data: teachingClassrooms, isLoading: isLoadingTeachingClassroom } = useTeachingClassrooms()


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

            {(isLoadingTeachingClassroom || isLoadingEnrolledClassroom) ?
                <CenteredCircularProgress />
                :
                <>
                    <SidebarClassroom
                        classrooms={enrolledClassrooms}
                        title='Enrolled'
                        maxWidth={width / 1.6}
                    />

                    <Divider />

                    <SidebarClassroom
                        classrooms={teachingClassrooms}
                        title='Teaching'
                        maxWidth={width / 1.6}
                    />
                </>
            }

        </Box>
    )
}


export default Sidebar
