import ClassCard from "./ClassroomCard"
import useClassrooms from "../hooks/api/useClassrooms"
import { Box, Grid, LinearProgress, Button, Stack, Typography } from "@mui/material"
import { Link } from 'react-router-dom'
import ListAltIcon from '@mui/icons-material/ListAlt';


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
            <Box sx={{ mb: 4 }}>
                <Button component={Link} to='/todo'>
                    <Stack
                        direction='row'
                        spacing={1}
                    >
                        <ListAltIcon />

                        <Typography variant="subtitle1">
                            To-do
                        </Typography>
                    </Stack>
                </Button>
            </Box>


            <Grid container spacing={3}>
                {classrooms.map((classroom) =>
                    <Grid item key={classroom.code} md={3} sm={6} xs={6}>
                        <ClassCard classroom={classroom} />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default Home
