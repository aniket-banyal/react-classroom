import { LoadingButton } from "@mui/lab"
import { Stack, TextField } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import useCreateSubmission from "../../../hooks/api/useCreateSubmission"

function CreateSubmission() {
    const [url, setUrl] = useState('')
    const { code, assignment_id } = useParams()
    const { mutate, isLoading } = useCreateSubmission()

    const handleSubmit = e => {
        e.preventDefault()

        const body = { url }
        mutate({ code, assignmentId: assignment_id, body })
        setUrl('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    type='url'
                    placeholder="File url..."
                    required
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                />

                <LoadingButton
                    type="submit"
                    variant="contained"
                    loadingIndicator="Submitting..."
                    loading={isLoading}
                >
                    Submit
                </LoadingButton >
            </Stack>
        </form>
    )

}

export default CreateSubmission
