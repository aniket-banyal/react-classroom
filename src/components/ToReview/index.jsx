import { Box, Grid, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CenteredCircularProgress from '../CenteredCircularProgress';
import SimpleAccordion from '../SimpleAccordion';
import SimpleSelect from '../SimpleSelect';
import useAllToReview from '../../hooks/api/useAllToReview';
import ToReviewAssignment from './ToReviewAssignment';
import useTeachingClassrooms from '../../hooks/api/useTeachingClassrooms';
import useGetWeekWiseAssignmentsToReview from '../../hooks/useGetWeekWiseAssignmentsToReview';


const accordionLabels = ['On Going', 'Earlier']

function ToReview() {
    const [selectedClassroom, setSelectedClassroom] = useState('All')
    const { data: allData, isLoading, isFetching } = useAllToReview()
    const { data: classrooms } = useTeachingClassrooms()
    const options = ['All']

    if (classrooms)
        classrooms.forEach(classroom => options.push(`${classroom.name}`))

    const filteredData = useMemo(() => {
        if (isLoading)
            return []

        if (selectedClassroom === 'All')
            return allData
        return allData.filter(({ assignment }) => assignment.classroom.name === selectedClassroom)

    }, [allData, selectedClassroom])

    const weekWiseAssignments = useGetWeekWiseAssignmentsToReview(filteredData, accordionLabels)


    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <Box sx={{ px: 10, py: 5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant='h4' textAlign='center'>
                        To-Review
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
                    {filteredData.length > 0 ?
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
                                        {weekWiseAssignments[accordionLabel]?.map(data =>
                                            <ToReviewAssignment
                                                key={data.assignment.id}
                                                data={data}
                                            />
                                        )}
                                    </Stack>
                                </SimpleAccordion>
                            )}
                        </Stack>
                        :
                        <Typography variant='h4'>Nothing to review right now</Typography>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}


export default ToReview
