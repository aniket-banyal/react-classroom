import { Outlet } from "react-router-dom"
import BasicTabs from "./BasicTabs"


const tabs = [
    {
        label: 'Announcements',
        link: ''
    },
    {
        label: 'Assignments',
        link: 'assignments'
    },
    {
        label: 'Students',
        link: 'students'
    }
]


function Dashboard() {

    return (
        <>
            <BasicTabs tabs={tabs} />
            <Outlet />
        </>
    )

}

export default Dashboard
