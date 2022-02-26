import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Student from "./Student"

function PeopleTab() {
    const [students, setStudents] = useState([])
    const [newDataAvailable, setNewDataAvailable] = useState(true)
    const { code } = useParams()


    useEffect(() => {
        const fetchStudents = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/students`, options)
            if (!response.ok) {
                // setError(true)
                return
            }
            const data = await response.json()
            setStudents(data)
            setNewDataAvailable(false)
        }
        if (newDataAvailable)
            fetchStudents()
    }, [code, newDataAvailable])

    const removeStudent = async (email) => {
        const options = {
            method: 'DELETE',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
        }

        const response = await fetch(`http://localhost:8000/api/classes/${code}/students/${email}`, options)
        setNewDataAvailable(true)
    }


    return (
        <>
            <h1>Students ({students.length}) </h1>
            {students.map(student =>
                <Student
                    key={student.email}
                    student={student}
                    onRemove={removeStudent}
                />
            )}
        </>
    )
}


export default PeopleTab
