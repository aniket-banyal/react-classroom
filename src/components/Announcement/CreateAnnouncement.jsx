import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react"
import useCreateAnnouncement from "../../hooks/api/useCreateAnnouncement"
import { useParams } from "react-router-dom"

function CreateAnnouncement({ onSubmit }) {
    const [text, setText] = useState('')
    const { code } = useParams()
    const { mutate } = useCreateAnnouncement()

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
                <Button
                    type="submit"
                    variant='contained'
                >
                    Create Announcement
                </Button>
            </Stack>
        </form>
    )

}

export default CreateAnnouncement
