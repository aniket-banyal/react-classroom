import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Announcement from "./Announcement";

function Classroom() {
    const { code } = useParams()
    const [announcements, setAnnouncements] = useState([])

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
            const data = await response.json()
            setAnnouncements(data.announcements)
        }
        fetchClassroom()
    }, [code])

    return (
        <div>
            {announcements.map(announcement => <Announcement key={announcement.id} announcement={announcement} />)}
        </div>
    )
}

export default Classroom
