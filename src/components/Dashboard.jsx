import ClassCard from "./ClassroomCard"
import { useEffect, useState } from "react"
import CreateClassroom from "./CreateClassroom"
import JoinClassroom from "./JoinClassroom"


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

    const joinClassroom = async (code) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ code })
        }

        const response = await fetch('http://localhost:8000/api/join_class', options)
        setNewDataAvailable(true)
    }


    return (
        <div>
            <CreateClassroom onSubmit={createNewClassroom} />
            <JoinClassroom onSubmit={joinClassroom} />
            {classroomList.map((classroom) => <ClassCard key={classroom.code} classroom={classroom} />)}
        </div>
    )
}

export default Dashboard
