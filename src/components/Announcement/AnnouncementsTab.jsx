import { Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import useAnnouncements from "../../hooks/api/useAnnouncements"
import Announcement from "./Announcement"
import CreateAnnouncement from "./CreateAnnouncement"
import CenteredCircularProgress from '../CenteredCircularProgress'


function AnnouncementsTab() {
    const { code } = useParams()
    const { data: announcements, isLoading } = useAnnouncements(code)


    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <>
            <CreateAnnouncement />

            {announcements.length > 0 ?
                <Stack spacing={3}>
                    {announcements.map(announcement =>
                        <Announcement
                            key={announcement.id}
                            announcement={announcement}
                        />
                    )}
                </Stack>
                :
                <Typography variant='h4'>No Announcements</Typography>
            }
        </>
    )
}

export default AnnouncementsTab
