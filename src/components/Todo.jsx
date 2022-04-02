import { Box, Stack, Typography } from '@mui/material';
import useAllAssignments from '../hooks/api/useAllAssignments';
import CenteredCircularProgress from './CenteredCircularProgress';
import TodoAssignment from './TodoAssignment';

function Todo() {
    const { data: assignments, isLoading } = useAllAssignments()

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <Box sx={{ p: 5 }}>
            {
                assignments.length > 0 ?
                    <Stack spacing={4}>
                        <Typography variant='h4' textAlign='center'>
                            To-do
                        </Typography>

                        <Stack spacing={3}>
                            {assignments.map(assignment =>
                                <TodoAssignment
                                    key={assignment.id}
                                    assignment={assignment}
                                />
                            )}
                        </Stack>
                    </Stack>
                    :
                    <Typography variant='h4'>Nothing on your To-do list right now</Typography>
            }
        </Box>
    )
}


export default Todo
