import { LoadingButton } from "@mui/lab"
import { Stack, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useCreateClassroom from "../../hooks/api/useCreateClassroom"


function CreateClassroom({ onSubmit }) {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const navigate = useNavigate()

    const { mutate, isLoading } = useCreateClassroom()

    const handleSubmit = e => {
        e.preventDefault()
        mutate({ name, subject }, {
            onSuccess: (data) => {
                onSubmit()
                navigate(`${data.code}/dashboard`)
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
                    loadingIndicator="Creating..."
                    loading={isLoading}
                >
                    Create
                </LoadingButton >
            </Stack>
        </form>
    )
}

export default CreateClassroom
