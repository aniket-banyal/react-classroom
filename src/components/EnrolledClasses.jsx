import { useEffect, useState } from "react"
import JoinClassroom from "./JoinClassroom"


function EnrolledClasses({ setClassrooms }) {
    const [newDataAvailable, setNewDataAvailable] = useState(true)

    useEffect(() => {
        const fetchClassroomList = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch('http://localhost:8000/api/classes_enrolled', options)
            const data = await response.json()
            setClassrooms(data)
            setNewDataAvailable(false)
        }
        if (newDataAvailable)
            fetchClassroomList()
    }, [newDataAvailable])

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
        <>
            <JoinClassroom onSubmit={joinClassroom} />
        </>

    )
}


export default EnrolledClasses
