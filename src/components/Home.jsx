import ClassCard from "./ClassroomCard"
import JoinClassroom from "./JoinClassroom"
import CreateClassroom from "./CreateClassroom"
import useClassrooms from "../hooks/useClassrooms"


function Home() {
    const classrooms = useClassrooms()

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
