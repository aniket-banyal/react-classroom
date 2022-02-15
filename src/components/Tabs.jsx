import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';

function Tabs({ tabs }) {
    const [value, setValue] = useState('0')

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        {tabs.map((tab, i) => <Tab key={i} label={tab.label} value={String(i)} />)}
                    </TabList>
                </Box>
                {tabs.map((tab, i) => <TabPanel key={i} value={String(i)}> {tab.element} </TabPanel>)}
            </TabContext>
        </Box >
    )
}

export default Tabs
