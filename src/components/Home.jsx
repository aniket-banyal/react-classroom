import { useEffect, useState } from "react"
import ClassCard from "./ClassroomCard"
import JoinClassroom from "./JoinClassroom"
import CreateClassroom from "./CreateClassroom"


function Home() {
    const [classrooms, setClassrooms] = useState([])

    useEffect(() => {
        const fetchClassroomList = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch('http://localhost:8000/api/classes', options)
            const data = await response.json()
            setClassrooms(data)
        }
        fetchClassroomList()
    }, [])


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
