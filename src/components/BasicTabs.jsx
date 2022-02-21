import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function BasicTabs({ tabs }) {
    let location = useLocation()
    let x = location.pathname.split('/')
    let initialValue = 0
    if (x.length === 3)
        initialValue = 0

    let last = x.pop()
    if (last === 'assignments')
        initialValue = 1
    else if (last === 'students')
        initialValue = 2

    const [value, setValue] = useState(initialValue)
    const navigate = useNavigate()


    const handleChange = (event, newValue) => { setValue(newValue) }

    useEffect(() => {
        navigate(tabs[value].link)
    }, [value, navigate, tabs])


    return (
        <Box sx={{ width: '100%', marginBottom: 5 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    {tabs.map(tab => <Tab key={tab.label} label={tab.label} />)}
                </Tabs>
            </Box>
        </Box>
    )
}


export default BasicTabs
