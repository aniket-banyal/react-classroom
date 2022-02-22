import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnnouncementsTab from "./AnnouncementsTab";

function Classroom() {
    const { code } = useParams()
    const [classroomDetails, setClassroomDetails] = useState(null)
    const [error, setError] = useState(false)

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
                    <p> Teacher: {classroomDetails.teacher.name} </p>
                    <p> Code: {classroomDetails.code} </p>
                </Box>
            }

            <AnnouncementsTab />
        </div>
    )
}

export default Classroom
