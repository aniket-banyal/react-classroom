import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';


function SidebarClassroomCard({ classroom }) {

    return (
        <ListItemButton component={Link} to={`/${classroom.code}/dashboard`} key={classroom.code}>
            <ListItemText primary={classroom.name} secondary={classroom.subject} />
        </ListItemButton>
    )
}


export default SidebarClassroomCard
