import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Announcement from "./Announcement";
import CreateAnnouncement from "./CreateAnnouncement";

function Classroom() {
    const { code } = useParams()
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
        const fetchClassroom = async () => {
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
            setAnnouncements(data.announcements)
            setNewDataAvailable(false)
        }
        if (newDataAvailable)
            fetchClassroom()
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
            <CreateAnnouncement onSubmit={createNewAnnouncement} />
            {announcements.map(announcement => <Announcement key={announcement.id} announcement={announcement} />)}
        </div>
    )
}

export default Classroom
