import ClassCard from "./ClassroomCard"
import axios from "axios"
import { useEffect, useState } from "react"

function Dashboard() {
    console.log('Dashboard')
    const [classroomList, setClassroomList] = useState([])

    useEffect(() => {
        const fetchClassroomList = async () => {
            const response = await axios.get('http://localhost:8000/api', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                }
            })
            setClassroomList(response.data)
        }

        fetchClassroomList()
    }, [])


    return (
        <div>
            {classroomList.map((classroom) => <ClassCard key={classroom.id} classroom={classroom} />)}
        </div>
    )
}

export default Dashboard
