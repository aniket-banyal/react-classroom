import { useEffect } from "react"
import CreateClassroom from "./CreateClassroom"

function TeachingClasses({ setClassrooms }) {

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
        }
        fetchClassroomList()
    }, [])




    return (
        <>
            <CreateClassroom />
        </>

    )
}


export default TeachingClasses
