import { Link, Stack, Typography } from "@mui/material"
import useUpcomingAssignment from "../../hooks/api/useUpcomingAssignment"
import useCreateDateTime from "../../hooks/useCreateDateTime"
import { Link as RouterLink } from 'react-router-dom';

function UpcomingAssignments({ code }) {
    const { data: assignment, isLoading } = useUpcomingAssignment(code)
    const dueDateTime = useCreateDateTime(assignment?.due_date_time)


    if (isLoading) {
        return (
            <Typography variant='subtitle2'>
                Loading...
            </Typography>
        )
    }

    //if there is no latest assignment
    if (assignment.data === null) {
        return null
    }

    return (
        <Stack spacing={2}>
            <Typography
                variant="subtitle2"
                color={'text.secondary'}
            >
                Due {dueDateTime}
            </Typography>

            <Link
                underline="hover"
                component={RouterLink}
                to={`/${code}/assignments/${assignment.id}`}
                color='inherit'
                variant="subtitle1"
            >
                {assignment.title}
            </Link>
        </Stack>
    )
}


export default UpcomingAssignments
