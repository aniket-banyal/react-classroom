import { useParams } from "react-router-dom"
import useStudents from "../../hooks/api/useStudents"
import Student from "./Student"

function PeopleTab() {
    const { code } = useParams()
    const { data: students, isLoading } = useStudents(code)


    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <h1>Students ({students.length}) </h1>
            {students.map(student =>
                <Student
                    key={student.email}
                    student={student}
                />
            )}
        </>
    )
}


export default PeopleTab
