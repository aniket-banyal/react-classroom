import ClassCard from "./ClassroomCard"
import { useEffect, useState } from "react"
import CreateClassroom from "./CreateClassroom"


function Dashboard() {
    console.log('Dashboard')
    const [classroomList, setClassroomList] = useState([])
    const [newDataAvailable, setNewDataAvailable] = useState(false)

    useEffect(() => {
        const fetchClassroomList = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch('http://localhost:8000/api/', options)
            const data = await response.json()
            setClassroomList(data)
            setNewDataAvailable(false)
        }
        fetchClassroomList()
    }, [newDataAvailable])

    const createNewClassroom = async (name, subject) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ name, subject })
        }

        const response = await fetch('http://localhost:8000/api/', options)
        const data = await response.json()
        setNewDataAvailable(true)
    }


    return (
        <div>
            <CreateClassroom onCreate={createNewClassroom} />
            {classroomList.map((classroom) => <ClassCard key={classroom.id} classroom={classroom} />)}
        </div>
    )
}

export default Dashboard
