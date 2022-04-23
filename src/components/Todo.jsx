import { Box, Grid, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import useAllAssignmentsToDo from '../hooks/api/useAllAssignmentsToDo';
import CenteredCircularProgress from './CenteredCircularProgress';
import SimpleAccordion from './SimpleAccordion';
import TodoAssignment from './TodoAssignment';
import SimpleSelect from './SimpleSelect';
import useEnrolledClassrooms from '../hooks/api/useEnrolledClassrooms';
import useGetWeekWiseAssignmentsToDo from '../hooks/useGetWeekWiseAssignmentsToDo';


const accordionLabels = ['This week', 'Next week', 'Later']

function Todo() {
    const [selectedClassroom, setSelectedClassroom] = useState('All')
    const { data: assignments, isLoading, isFetching } = useAllAssignmentsToDo()
    const { data: classrooms } = useEnrolledClassrooms()
    const options = ['All']

    if (classrooms)
        classrooms.forEach(classroom => options.push(`${classroom.name}`))

    const filteredAssignments = useMemo(() => {
        if (isLoading)
            return []

        if (selectedClassroom === 'All')
            return assignments
        return assignments.filter(assignment => assignment.classroom.name === selectedClassroom)

    }, [assignments, isFetching, selectedClassroom])

    const weekWiseAssignments = useGetWeekWiseAssignmentsToDo(filteredAssignments, accordionLabels)


    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <Box sx={{ px: 10, py: 5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant='h4' textAlign='center'>
                        To-do
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <SimpleSelect
                        label='Classroom'
                        options={options}
                        value={selectedClassroom}
                        onChange={(classroom) => setSelectedClassroom(classroom)}
                    />
                </Grid>

                <Grid item xs={12}>
                    {filteredAssignments.length > 0 ?
                        <Stack spacing={4}>
                            {accordionLabels.map(accordionLabel =>
                                <SimpleAccordion
                                    key={accordionLabel}
                                    title={`${accordionLabel} (${weekWiseAssignments[accordionLabel]?.length})`}
                                    openInitialy={weekWiseAssignments[accordionLabel]?.length > 0 &&
                                        accordionLabel === accordionLabels[0]}
                                    disabled={weekWiseAssignments[accordionLabel]?.length === 0}
                                >
                                    <Stack spacing={3}>
                                        {weekWiseAssignments[accordionLabel]?.map(assignment =>
                                            <TodoAssignment
                                                key={assignment.id}
                                                assignment={assignment}
                                            />
                                        )}
                                    </Stack>
                                </SimpleAccordion>
                            )}
                        </Stack>
                        :
                        <Typography variant='h4'>Nothing on your To-do list right now</Typography>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}


export default Todo
