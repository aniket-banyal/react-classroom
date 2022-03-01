import JoinClassroom from "./JoinClassroom"
import CreateClassroom from "./CreateClassroom"
import { Box } from "@mui/material"
import Classrooms from "./Classrooms"

function Home() {

    return (
        <Box>
            <header style={{ margin: 20 }}>
                <JoinClassroom />
                <CreateClassroom />
            </header>

            <Classrooms />
        </Box>
    )
}

export default Home
