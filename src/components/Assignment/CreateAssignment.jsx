import { useState } from "react"
import { useParams } from "react-router-dom"
import BaseDateTimePicker from "../BasicDateTimePicker"
import useCreateAssignment from "../../hooks/api/useCreateAssignment"
import { addErrorToast } from "../../helpers/addToast"
import { Stack, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"

const initialAssignment = {
    title: '',
    text: '',
    points: '',
    due_date_time: new Date()
}

function CreateAssignment({ onSubmit }) {
    const [assignment, setAssignment] = useState(initialAssignment)
    const { code } = useParams()
    const { mutate, isLoading } = useCreateAssignment()

    const handleSubmit = e => {
        e.preventDefault()
        assignment.due_date_time = new Date(assignment.due_date_time).getTime()

        const body = {
            title: assignment.title,
            text: assignment.text,
            due_date_time: assignment.due_date_time,
            points: assignment.points
        }

        mutate({ code, body }, {
            onSuccess: () => {
                onSubmit()
                setAssignment(initialAssignment)
            },
            onError: (error) => {
                const { status, data } = error.response
                if (status === 400)
                    addErrorToast(data.due_date_time[0])
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    autoFocus
                    variant="outlined"
                    type="text"
                    placeholder='Title'
                    required
                    value={assignment.title}
                    onChange={e => setAssignment({
                        ...assignment,
                        title: e.target.value,
                    })}
                />

                <TextField
                    multiline
                    rows={10}
                    type="text"
                    placeholder="New Assignment"
                    required
                    value={assignment.text}
                    onChange={e => setAssignment({
                        ...assignment,
                        text: e.target.value,
                    })}
                />

                <TextField
                    variant="outlined"
                    type="number"
                    inputProps={{ min: "0" }}
                    placeholder='Points'
                    required
                    value={assignment.points}
                    onChange={e => setAssignment({
                        ...assignment,
                        points: e.target.value,
                    })}
                />

                <BaseDateTimePicker
                    value={assignment.due_date_time}
                    onChange={value => setAssignment({
                        ...assignment,
                        due_date_time: value,
                    })}
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

export default CreateAssignment
