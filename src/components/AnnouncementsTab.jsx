import { useEffect, useState } from "react"
import Announcement from "./Announcement"
import CreateAnnouncement from "./CreateAnnouncement"

function AnnouncementsTab({ code }) {
    const [announcements, setAnnouncements] = useState([])
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

    const editAnnouncement = async (id, text) => {
        const options = {
            method: 'PUT',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ text })
        }

        const response = await fetch(`http://localhost:8000/api/classes/${code}/announcements/${id}`, options)
        setNewDataAvailable(true)
    }

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
                // setError(true)
                return
            }
            const data = await response.json()
            setAnnouncements(data)
            setNewDataAvailable(false)
        }
        if (newDataAvailable)
            fetchAnnouncement()
    }, [code, newDataAvailable])



    return (
        <>
            <CreateAnnouncement onSubmit={createNewAnnouncement} />
            {announcements.map(announcement => {
                return (
                    <Announcement
                        key={announcement.id}
                        announcement={announcement}
                        code={code}
                        onEdit={editAnnouncement}
                    />
                )
            })}
        </>
    )

}

export default AnnouncementsTab
