import { LoadingButton } from "@mui/lab"
import { Stack, TextField } from "@mui/material"
import { useState } from "react"
import useEditClassroom from "../hooks/api/useEditClassroom"

function EditClassroom({ classroom, onSubmit }) {
    const [name, setName] = useState(classroom.name)
    const [subject, setSubject] = useState(classroom.subject)
    const { mutate, isLoading } = useEditClassroom()

    const handleSubmit = e => {
        e.preventDefault()
        const body = { name, subject }
        mutate({ code: classroom.code, body }, {
            onSuccess: () => {
                setName('')
                setSubject('')
                onSubmit()
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    autoFocus
                    type="text"
                    placeholder='Name...'
                    value={name}
                    required
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    type="text"
                    placeholder='Subject...'
                    value={subject}
                    required
                    onChange={e => setSubject(e.target.value)}
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

export default EditClassroom
