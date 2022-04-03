import { Box, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import useAllAssignments from '../hooks/api/useAllAssignments';
import CenteredCircularProgress from './CenteredCircularProgress';
import SimpleAccordion from './SimpleAccordion';
import TodoAssignment from './TodoAssignment';
import { endOfWeek } from 'date-fns';
import SimpleSelect from './SimpleSelect';
import useClassrooms from '../hooks/api/useClassrooms';


const accordionLabels = ['This week', 'Next week', 'Later']

function Todo() {
    const [weekWiseAssignments, setWeekWiseAssignments] = useState({})
    const [selectedClassroom, setSelectedClassroom] = useState('All')
    const { data: assignments, isLoading, isFetching } = useAllAssignments()
    const { data: classrooms } = useClassrooms()
    const options = ['All']

    if (classrooms)
        classrooms.forEach(classroom => options.push(`${classroom.name}`))

    const filteredAssignments = useMemo(() => {
        if (isLoading)
            return []

        if (selectedClassroom === 'All')
            return assignments
        return assignments.filter(assignment => assignment.classroom.name === selectedClassroom)

    }, [assignments, selectedClassroom])

    useEffect(() => {
        if (isLoading)
            return

        const now = new Date()
        const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 })
        const endOfNextWeek = new Date(endOfThisWeek.getTime())
        endOfNextWeek.setDate(endOfNextWeek.getDate() + 7)

        const weekWiseAssignments = {}
        accordionLabels.forEach(accordionLabel => {
            weekWiseAssignments[accordionLabel] = []
        })

        filteredAssignments.forEach(assignment => {
            const assignmentDueDate = new Date(assignment.due_date_time)

            if (assignmentDueDate.getTime() < endOfThisWeek)
                weekWiseAssignments[accordionLabels[0]].push(assignment)

            else if (assignmentDueDate.getTime() < endOfNextWeek)
                weekWiseAssignments[accordionLabels[1]].push(assignment)

            else
                weekWiseAssignments[accordionLabels[2]].push(assignment)
        })

        setWeekWiseAssignments(weekWiseAssignments)

    }, [isFetching, filteredAssignments])


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
