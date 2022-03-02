import { Stack, TextField } from "@mui/material";
import { useState } from "react"
import useCreateAnnouncement from "../../hooks/api/useCreateAnnouncement"
import { useParams } from "react-router-dom"
import { LoadingButton } from "@mui/lab"

function CreateAnnouncement({ onSubmit }) {
    const [text, setText] = useState('')
    const { code } = useParams()
    const { mutate, isLoading } = useCreateAnnouncement()

    const handleSubmit = e => {
        e.preventDefault()
        const body = { text }
        mutate({ code, body }, {
            onSuccess: () => {
                onSubmit()
                setText('')
            }
        })
    }

    return (
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
                >
                    Post
                </LoadingButton >
            </Stack>
        </form>
    )

}

export default CreateAnnouncement
