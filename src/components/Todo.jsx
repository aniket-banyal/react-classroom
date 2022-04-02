import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useAllAssignments from '../hooks/api/useAllAssignments';
import CenteredCircularProgress from './CenteredCircularProgress';
import SimpleAccordion from './SimpleAccordion';
import TodoAssignment from './TodoAssignment';
import { endOfWeek } from 'date-fns';


const accordionLabels = ['This week', 'Next week', 'Later']

function Todo() {
    const { data: assignments, isLoading, isFetching } = useAllAssignments()
    const [weekWiseAssignments, setWeekWiseAssignments] = useState({})

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

        assignments.forEach(assignment => {
            const assignmentDueDate = new Date(assignment.due_date_time)

            if (assignmentDueDate.getTime() < endOfThisWeek)
                weekWiseAssignments[accordionLabels[0]].push(assignment)

            else if (assignmentDueDate.getTime() < endOfNextWeek)
                weekWiseAssignments[accordionLabels[1]].push(assignment)

            else
                weekWiseAssignments[accordionLabels[2]].push(assignment)
        })

        setWeekWiseAssignments(weekWiseAssignments)

    }, [isFetching])


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
        </Box>
    )
}


export default Todo
