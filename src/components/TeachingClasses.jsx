import { useEffect, useState } from "react"
import CreateClassroom from "./CreateClassroom"

function TeachingClasses({ setClassrooms }) {
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

            const response = await fetch('http://localhost:8000/api/classes_teaching', options)
            const data = await response.json()
            setClassrooms(data)
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

        const response = await fetch('http://localhost:8000/api/classes_teaching', options)
        setNewDataAvailable(true)
    }


    return (
        <>
            <CreateClassroom onSubmit={createNewClassroom} />
        </>

    )
}


export default TeachingClasses
