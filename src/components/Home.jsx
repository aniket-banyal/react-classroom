import ClassCard from "./ClassroomCard"
import JoinClassroom from "./JoinClassroom"
import CreateClassroom from "./CreateClassroom"
import useClassrooms from "../hooks/api/useClassrooms"

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
        <div>
            <header style={{ margin: 20 }}>
                <JoinClassroom />
                <CreateClassroom />
            </header>

            {classrooms.map((classroom) => <ClassCard key={classroom.code} classroom={classroom} />)}
        </div>
    )
}

export default Home
