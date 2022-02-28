import { Outlet, useParams } from "react-router-dom"
import useUserRole from "../../hooks/api/useUserRole"
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
    const { code } = useParams()
    const { data: userRole } = useUserRole(code)

    return (
        <>
            {userRole === 'teacher' && <BasicTabs tabs={tabs} />}
            <Outlet />
        </>
    )

}

export default AssignmentDetailAndSubmissionBase
