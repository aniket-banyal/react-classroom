import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useCreateDateTime from "../hooks/useCreateDateTime";


function TodoAssignment({ assignment }) {
    const dueDateTime = useCreateDateTime(assignment.due_date_time)

    return (
        <>
            <Card elevation={2}>
                <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <CardActionArea component={Link} to={`/${assignment.classroom.code}/assignments/${assignment.id}`}>
                        <CardContent>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Box>
                                    <Typography variant="h5" gutterBottom>
                                        {assignment.title}
                                    </Typography>

                                    <Typography variant="body1" gutterBottom>
                                        {assignment.classroom.name}
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="subtitle1"
                                    color='primary'
                                >
                                    Due {dueDateTime}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Box>
            </Card>
        </>
    )
}

export default TodoAssignment
