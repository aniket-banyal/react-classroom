import Drawer from '@mui/material/Drawer';
import Sidebar from './Sidebar';


function TemporaryDrawer({ open, toggleDrawer }) {

    return (
        <div>
            <Drawer
                anchor='left'
                open={open}
                onClose={toggleDrawer}
            >
                <Sidebar toggleDrawer={toggleDrawer} />
            </Drawer>
        </div>
    )
}

export default TemporaryDrawer
