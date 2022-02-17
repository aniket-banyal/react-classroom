import { useEffect } from "react"
import JoinClassroom from "./JoinClassroom"


function EnrolledClasses({ setClassrooms }) {

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
        }
        fetchClassroomList()
    }, [])


    return (
        <>
            <JoinClassroom />
        </>
    )
}


export default EnrolledClasses
