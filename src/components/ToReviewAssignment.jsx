import { Box, Card, CardActionArea, CardContent, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useCreateDateTime from "../hooks/useCreateDateTime";


function Stat({ number, label }) {

    return (
        <Stack>
            <Typography variant='h5'>
                {number}
            </Typography>

            <Typography
                variant='subtitle2'
                color='text.secondary'
            >
                {label}
            </Typography>
        </Stack>
    )
}

function ToReviewAssignment({ data }) {
    const { assignment, turned_in: turnedIn, graded } = data
    const dueDateTime = useCreateDateTime(assignment.due_date_time)

    return (
        <>
            <Card variant='outlined' elevation={0}>
                <CardActionArea component={Link} to={`/${assignment.classroom.code}/assignments/${assignment.id}/submissions`}>
                    <CardContent>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Box sx={{ width: '70%' }}>
                                <Typography
                                    variant="h6"
                                    color='primary'
                                    noWrap
                                >
                                    {assignment.title}
                                </Typography>

                                <Typography variant="subtitle1">
                                    {assignment.classroom.name}
                                </Typography>

                                <Typography
                                    variant="subtitle2"
                                    color='text.secondary'
                                >
                                    Due {dueDateTime}
                                </Typography>
                            </Box>

                            <Stack direction='row' spacing={4}>
                                <Stat
                                    number={turnedIn}
                                    label='To Review'
                                />
                                <Stat
                                    number={graded}
                                    label='Graded'
                                />
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default ToReviewAssignment
