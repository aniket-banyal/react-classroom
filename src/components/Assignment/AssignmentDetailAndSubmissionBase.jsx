import { Outlet } from "react-router-dom"
import useUser from "../../hooks/useUser"
import BasicTabs from "../BasicTabs"

const tabs = [
    {
        label: 'Instructions',
        link: ''
    },
    {
        label: 'Submissions',
        link: 'submissions'
    }
]

function AssignmentDetailAndSubmissionBase() {
    const { user } = useUser()

    return (
        <>
            {user.role === 'teacher' && <BasicTabs tabs={tabs} />}
            <Outlet />
        </>
    )

}

export default AssignmentDetailAndSubmissionBase
