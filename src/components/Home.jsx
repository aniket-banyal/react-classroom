import ClassCard from "./ClassroomCard"
import JoinClassroom from "./JoinClassroom"
import CreateClassroom from "./CreateClassroom"
import useClassrooms from "../hooks/api/useClassrooms"
import { Box, Grid } from "@mui/material"

function Home() {
    const { data: classrooms, isLoading, isError, error } = useClassrooms()

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (isError) {
        return (
            <h1> Error: {error.message} </h1>
        )
    }

    return (
        <Box>
            <header style={{ margin: 20 }}>
                <JoinClassroom />
                <CreateClassroom />
            </header>

            <Grid container spacing={2}>
                {classrooms.map((classroom) =>
                    <Grid item key={classroom.code} xs={6}>
                        <ClassCard classroom={classroom} />
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default Home
