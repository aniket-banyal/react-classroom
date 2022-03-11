import TemporaryDrawer from './TemporaryDrawer';
import { useState } from 'react';
import NavbarAppBar from "./NavbarAppBar"


function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = () => { setDrawerOpen(!drawerOpen) }

    return (
        <div>
            <NavbarAppBar
                toggleDrawer={toggleDrawer}
                drawerOpen={drawerOpen}
            />

            <TemporaryDrawer
                toggleDrawer={toggleDrawer}
                open={drawerOpen}
            />
        </div>
    )
}

export default Navbar
