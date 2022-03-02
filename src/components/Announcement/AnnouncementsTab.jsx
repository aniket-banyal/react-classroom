import { Fab, Stack } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import useAnnouncements from "../../hooks/api/useAnnouncements"
import BasicModal from "../BasicModal"
import Announcement from "./Announcement"
import CreateAnnouncement from "./CreateAnnouncement"
import AddIcon from '@mui/icons-material/Add';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex: 10
}


function AnnouncementsTab() {
    const [creating, setCreating] = useState(false)
    const { code } = useParams()
    const { data: announcements, isLoading } = useAnnouncements(code)


    if (isLoading) {
        return null
    }

    return (
        <>
            <Fab
                color="primary"
                variant='extended'
                style={style}
                onClick={() => setCreating(true)}
                focusRipple={false}
            >
                <AddIcon />
                New Announcement
            </Fab>

            <BasicModal
                open={creating}
                setOpen={setCreating}
                title='Create Announcement'
            >
                <CreateAnnouncement onSubmit={() => setCreating(false)} />
            </BasicModal>

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
