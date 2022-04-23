import ClassroomCard from "./ClassroomCard"
import useClassrooms from "../../hooks/api/useClassrooms"
import { Box, Grid, LinearProgress, Button, Stack, Typography } from "@mui/material"
import { Link } from 'react-router-dom'
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';


function Home() {
    const { data: classrooms, isLoading, isError, error } = useClassrooms()

    if (isLoading) {
        return <LinearProgress />
    }

    if (isError) {
        return (
            <h1> Error: {error.message} </h1>
        )
    }

    return (
        <Box sx={{ p: 5 }}>

            {
                classrooms.length > 0 ?
                    <>
                        <Stack direction='row' spacing={2} sx={{ mb: 4 }}>
                            <Button component={Link} to='/todo'>
                                <Stack
                                    direction='row'
                                    spacing={1}
                                    alignItems='center'
                                >
                                    <AssignmentIcon />

                                    <Typography variant="subtitle1">
                                        To-do
                                    </Typography>
                                </Stack>
                            </Button>

                            <Button component={Link} to='/toreview'>
                                <Stack
                                    direction='row'
                                    spacing={1}
                                    alignItems='center'
                                >
                                    <ListAltIcon />

                                    <Typography variant="subtitle1">
                                        To-Review
                                    </Typography>
                                </Stack>
                            </Button>
                        </Stack>


                        <Grid container spacing={3}>
                            {classrooms.map((classroom) =>
                                <Grid item key={classroom.code} md={3} sm={6} xs={6}>
                                    <ClassroomCard classroom={classroom} />
                                </Grid>
                            )}
                        </Grid>
                    </>
                    :
                    <Stack alignItems='center'>
                        <Typography variant="h5">
                            No Classrooms
                        </Typography>
                    </Stack>
            }
        </Box>
    )
}

export default Home
