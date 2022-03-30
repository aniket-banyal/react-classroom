import ListItemText from '@mui/material/ListItemText';
import { ListItemButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import NameAvatar from "../NameAvatar"


function SidebarClassroomCard({ classroom, maxWidth }) {

    return (
        <ListItemButton component={Link} to={`/${classroom.code}/dashboard`} key={classroom.code}>
            <Stack direction='row' spacing={3} alignItems='center'>
                <NameAvatar
                    size='small'
                    name={classroom.name}
                />
                <ListItemText
                    style={{ maxWidth: maxWidth }}
                    primary={classroom.name}
                    primaryTypographyProps={{ noWrap: true }}
                    secondary={classroom.subject}
                />
            </Stack>
        </ListItemButton>
    )
}


export default SidebarClassroomCard
