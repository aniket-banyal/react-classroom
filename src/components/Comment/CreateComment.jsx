import { useState } from "react"
import useCreateComment from "../../hooks/api/useCreateComment"
import { useParams } from "react-router-dom"
import { Button, Stack, TextField } from "@mui/material"
import { Box } from "@mui/system"


function CreateComment({ announcementId, onCreate }) {
    const [text, setText] = useState('')
    const { code } = useParams()
    const { mutate } = useCreateComment()


    const handleSubmit = e => {
        e.preventDefault()
        const body = { text }
        mutate({ code, announcementId, body }, {
            onSuccess: () => {
                onCreate()
                setText('')
            }
        })
    }

    return (
        <Box sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack direction='row' spacing={2}>
                    <TextField
                        multiline
                        sx={{ flexGrow: 1 }}
                        variant="outlined"
                        size="small"
                        type="text"
                        placeholder='New Comment...'
                        value={text}
                        required
                        onChange={e => setText(e.target.value)}
                    />
                    <Stack justifyContent='flex-end' >
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Post
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    )
}


export default CreateComment
