import ClassCard from "./ClassroomCard"
import useClassrooms from "../hooks/api/useClassrooms"
import { Grid } from "@mui/material"


function Classrooms() {
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
        <Grid container spacing={2}>
            {classrooms.map((classroom) => <Grid item key={classroom.code} xs={6}>
                <ClassCard classroom={classroom} />
            </Grid>
            )}
        </Grid>
    )
}


export default Classrooms
