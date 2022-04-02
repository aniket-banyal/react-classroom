import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useCreateEditDateTime from "../hooks/useCreateEditDateTime";
import useCreateDateTime from "../hooks/useCreateDateTime";


function TodoAssignment({ assignment }) {
    const createdDateTime = useCreateEditDateTime(assignment.created_at, assignment.edited_at)
    const dueDateTime = useCreateDateTime(assignment.due_date_time)

    return (
        <>
            <Card>
                <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <CardActionArea component={Link} to={`/${assignment.classroom.code}/assignments/${assignment.id}`}>
                        <CardContent>
                            <Box style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                                <Box>
                                    <Typography variant="h5" gutterBottom>
                                        {assignment.title}
                                    </Typography>

                                    <Typography variant="body1" gutterBottom>
                                        {assignment.classroom.name}
                                    </Typography>

                                    <Typography variant="subtitle2">
                                        Posted at - {createdDateTime}
                                    </Typography>

                                    <Typography variant="subtitle2">
                                        Due date - {dueDateTime}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Box>
            </Card>
        </>
    )
}

export default TodoAssignment
