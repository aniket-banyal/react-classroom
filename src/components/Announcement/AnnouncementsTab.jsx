import { Stack } from "@mui/material"
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

            <Stack spacing={3}>
                {announcements.map(announcement =>
                    <Announcement
                        key={announcement.id}
                        announcement={announcement}
                    />
                )}
            </Stack>
        </>
    )

}

export default AnnouncementsTab
