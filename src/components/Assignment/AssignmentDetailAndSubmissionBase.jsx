import { Link } from "@mui/material"
import { Outlet, useParams } from "react-router-dom"
import { useAssignment } from "../../hooks/api/useAssignment"
import useUserRole from "../../hooks/api/useUserRole"
import BasicTabs from "../shared/BasicTabs"
import CenteredCircularProgress from "../shared/CenteredCircularProgress"
import NotFound from "../shared/NotFound"
import { Link as RouterLink } from 'react-router-dom';


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
    const { code, assignmentId } = useParams()
    const { isLoading, isError } = useAssignment(code, assignmentId)
    const { data: userRole } = useUserRole(code)

    if (isLoading)
        return <CenteredCircularProgress />

    if (isError)
        return (
            <NotFound msg='No such assignment found'>
                <Link
                    component={RouterLink}
                    to={`/${code}/dashboard/assignments`}
                >
                    Back to Assignments
                </Link>
            </NotFound>
        )

    return (
        <>
            {userRole === 'teacher' && <BasicTabs tabs={tabs} />}
            <Outlet />
        </>
    )

}

export default AssignmentDetailAndSubmissionBase
