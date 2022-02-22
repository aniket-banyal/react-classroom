import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Student from "./Student"

function StudentsTab() {
    const [students, setStudents] = useState([])
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
        }
        fetchStudents()
    }, [code])


    return (
        <>
            <h1>Students ({students.length}) </h1>
            {students.map(student => <Student key={student.email} student={student} />)}
        </>
    )
}


export default StudentsTab
