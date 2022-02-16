import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Announcement from "./Announcement";
import CreateAnnouncement from "./CreateAnnouncement";

function Classroom() {
    const { code } = useParams()
    const [classroomDetails, setClassroomDetails] = useState(null)
    const [announcements, setAnnouncements] = useState([])
    const [error, setError] = useState(false)
    const [newDataAvailable, setNewDataAvailable] = useState(true)

    const createNewAnnouncement = async (text) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ text })
        }

        const response = await fetch(`http://localhost:8000/api/classes/${code}/announcements`, options)
        setNewDataAvailable(true)
    }

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
        const fetchAnnouncement = async () => {
            const options = {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                    'content-Type': 'application/json',
                }),
            }

            const response = await fetch(`http://localhost:8000/api/classes/${code}/announcements`, options)
            if (!response.ok) {
                setError(true)
                return
            }
            const data = await response.json()
            setAnnouncements(data)
            setNewDataAvailable(false)
        }
        if (newDataAvailable)
            fetchAnnouncement()
    }, [code, newDataAvailable])

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

            <CreateAnnouncement onSubmit={createNewAnnouncement} />
            {announcements.map(announcement => <Announcement key={announcement.id} announcement={announcement} />)}
        </div>
    )
}

export default Classroom
