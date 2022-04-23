import { Link, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
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
                variant="subtitle1"
                color={'text.secondary'}
            >
                Upcoming
            </Typography>

            <Box>
                <Typography variant="subtitle2">
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
            </Box>
        </Stack>
    )
}


export default UpcomingAssignments
