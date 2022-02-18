import Tabs from "./Tabs";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StudentsTab from "./StudentsTab";
import AnnouncementsTab from "./AnnouncementsTab";

function Classroom() {
    const { code } = useParams()
    const [classroomDetails, setClassroomDetails] = useState(null)
    const [error, setError] = useState(false)
    const [role, setRole] = useState('')

    useEffect(() => {
        const fetchClassroomDetails = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}`, options)
            if (!response.ok) {
                setError(true)
                return
            }
            const data = await response.json()
            setClassroomDetails(data)
        }
        fetchClassroomDetails()
    }, [code])


    useEffect(() => {
        const fetchUserRole = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/user_role`, options)
            const data = await response.json()
            setRole(data.role)
        }
        fetchUserRole()
    }, [code])


    if (error)
        return (
            <div>
                <h1>Invalid class code</h1>
                <Link to='/'>Back to Classes</Link>
            </div>
        )

    return (
        <div>
            {classroomDetails &&
                <Box sx={{ border: 1, borderColor: 'divider', marginTop: 5, marginBottom: 5 }}>
                    <h1> {classroomDetails.name} </h1>
                    <p> Subject: {classroomDetails.subject} </p>
                </Box>
            }

            <Tabs tabs={
                [
                    {
                        label: 'Announcements',
                        element: <AnnouncementsTab code={code} role={role} />
                    },
                    {
                        label: 'Students',
                        element: <StudentsTab code={code} />
                    }
                ]
            }
            />


        </div>
    )
}

export default Classroom
