import { List, Typography } from '@mui/material';
import SidebarClassroomCard from './SidebarClassroomCard';

function SidebarClassroom({ title, classrooms }) {

    return (
        <>
            <Typography
                color='secondary'
                sx={{ mx: 2, mt: 2 }}
            >
                {title}
            </Typography>

            <List>
                {classrooms.map(classroom =>
                    <SidebarClassroomCard
                        key={classroom.code}
                        classroom={classroom}
                    />
                )}
            </List>
        </>
    )
}

export default SidebarClassroom
