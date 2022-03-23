import { LoadingButton } from "@mui/lab"
import { Stack, TextField } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import useEditAnnouncement from "../../hooks/api/useEditAnnouncement"

function EditAnnouncement({ announcement, onSubmit }) {
    const [text, setText] = useState(announcement.text)
    const { code } = useParams()
    const { mutate, isLoading } = useEditAnnouncement()

    const handleSubmit = e => {
        e.preventDefault()
        const body = { text }
        mutate({ code, announcementId: announcement.id, body }, {
            onSuccess: () => {
                setText('')
                onSubmit()
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
                    value={text}
                    required
                    onChange={e => setText(e.target.value)}
                />
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loadingIndicator="Saving..."
                    loading={isLoading}
                >
                    Save
                </LoadingButton >
            </Stack>
        </form>
    )

}

export default EditAnnouncement
