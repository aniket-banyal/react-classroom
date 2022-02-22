import { useState } from "react"
import Tabs from "./Tabs"
import EnrolledClasses from "./EnrolledClasses"
import TeachingClasses from "./TeachingClasses"
import ClassCard from "./ClassroomCard"


function Home() {
    const [classrooms, setClassrooms] = useState([])

    return (
        <div>
            <Tabs tabs={
                [
                    {
                        label: 'Enrolled',
                        element: <EnrolledClasses setClassrooms={setClassrooms} />
                    },
                    {
                        label: 'Teaching',
                        element: <TeachingClasses setClassrooms={setClassrooms} />
                    }
                ]
            }
            />

            {classrooms.map((classroom) => <ClassCard key={classroom.code} classroom={classroom} />)}
        </div>
    )
}

export default Home
