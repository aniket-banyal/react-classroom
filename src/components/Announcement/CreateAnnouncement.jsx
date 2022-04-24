import AddIcon from '@mui/icons-material/Add';
import { Stack, TextField } from "@mui/material";
import { useState } from "react"
import useCreateAnnouncement from "../../hooks/api/useCreateAnnouncement"
import { useParams } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import BasicModal from "../shared/BasicModal"
import StyledFab from "../shared/StyledFab"


function CreateAnnouncement() {
    const [text, setText] = useState('')
    const [creating, setCreating] = useState(false)
    const { code } = useParams()
    const { mutate, isLoading } = useCreateAnnouncement()

    const handleSubmit = e => {
        e.preventDefault()
        const body = { text }
        mutate({ code, body }, {
            onSuccess: () => {
                setCreating(false)
                setText('')
            }
        })
    }

    return (
        <>
            <StyledFab
                color="primary"
                variant='extended'
                onClick={() => setCreating(true)}
                focusRipple={false}
            >
                <AddIcon />
                New Announcement
            </StyledFab>


            <BasicModal
                open={creating}
                setOpen={setCreating}
                title='Create Announcement'
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            autoFocus
                            multiline
                            rows={10}
                            type="text"
                            placeholder='New Announcement...'
                            value={text}
                            required
                            onChange={e => setText(e.target.value)}
                        />
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loadingIndicator="Posting..."
                            loading={isLoading}
                            disabled={text === ''}
                        >
                            Post
                        </LoadingButton >
                    </Stack>
                </form>
            </BasicModal>
        </>
    )
}

export default CreateAnnouncement
