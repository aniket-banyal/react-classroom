import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useJoinClassroom from "../../hooks/api/useJoinClassroom"
import { addErrorToast } from "../../helpers/addToast"
import { Stack, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"


function JoinClassroom({ onSubmit }) {
    const [code, setCode] = useState('')
    const navigate = useNavigate()
    const { mutate, isLoading } = useJoinClassroom()


    const handleSubmit = e => {
        e.preventDefault()

        mutate(code, {
            onSuccess: () => {
                navigate(`${code}/dashboard`)
                onSubmit()
            },
            onError: (error) => {
                const status = error.response.status

                if (status === 409) {
                    navigate(`/${code}/dashboard`)
                    onSubmit()
                }

                else if (status === 404)
                    addErrorToast('Invalid Classroom Code')
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        autoFocus
                        type="text"
                        placeholder='Classroom Code...'
                        value={code}
                        required
                        onChange={e => setCode(e.target.value)}
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loadingIndicator="Joining..."
                        loading={isLoading}
                        disabled={code === ''}
                    >
                        Join
                    </LoadingButton >
                </Stack>
            </form>
        </>
    )
}


export default JoinClassroom
