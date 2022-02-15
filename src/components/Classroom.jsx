import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Announcement from "./Announcement";

function Classroom() {
    const { code } = useParams()
    const [announcements, setAnnouncements] = useState([])
    const [error, setError] = useState(false)

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
        }
        fetchClassroom()
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
            {announcements.map(announcement => <Announcement key={announcement.id} announcement={announcement} />)}
        </div>
    )
}

export default Classroom
