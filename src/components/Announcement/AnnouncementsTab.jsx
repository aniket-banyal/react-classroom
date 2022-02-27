import { useParams } from "react-router-dom"
import useAnnouncements from "../../hooks/api/useAnnouncements"
import Announcement from "./Announcement"
import CreateAnnouncement from "./CreateAnnouncement"

function AnnouncementsTab() {
    const { code } = useParams()
    const { data: announcements, isLoading } = useAnnouncements(code)


    if (isLoading) {
        return null
    }

    return (
        <>
            <CreateAnnouncement />

            {announcements.map(announcement => {
                return (
                    <Announcement
                        key={announcement.id}
                        announcement={announcement}
                    />
                )
            })}
        </>
    )

}

export default AnnouncementsTab
