import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


function getInitialValue(location, tabs) {
    let x = location.pathname.split('/')
    let last = (x.length === 4) ? '' : x.pop()
    return tabs.findIndex((tab) => last === tab.link)
}

function BasicTabs({ tabs }) {
    const [value, setValue] = useState(0)
    const location = useLocation()

    useEffect(() => {
        setValue(getInitialValue(location, tabs))
    }, [location.pathname])


    const handleChange = (event, newValue) => { setValue(newValue) }

    return (
        <Box sx={{ width: '100%', marginBottom: 5 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    {tabs.map(tab =>
                        <Tab
                            key={tab.label}
                            label={tab.label}
                            to={tab.link}
                            component={Link}
                        />
                    )}
                </Tabs>
            </Box>
        </Box>
    )
}


export default BasicTabs
