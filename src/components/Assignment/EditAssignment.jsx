import { useParams } from "react-router-dom"
import { useAssignment } from "../../hooks/api/useAssignment"
import useEditAssignment from "../../hooks/api/useEditAssignment"
import { addErrorToast } from "../../helpers/addToast"
import { useEffect, useState } from "react"
import BaseDateTimePicker from "../shared/BasicDateTimePicker"
import { Stack, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"

const initialAssignment = {
    title: '',
    text: '',
    points: '',
    due_date_time: new Date(Date.now() + (2 * 60 * 1000))
}

function EditAssignment({ assignmentId, onSubmit }) {
    const { code } = useParams()
    const { mutate, isLoading: isEditing } = useEditAssignment()
    const { data: assignment, isLoading } = useAssignment(code, assignmentId)
    const [newAssignment, setNewAssignment] = useState(initialAssignment)


    const handleSubmit = (e) => {
        e.preventDefault()
        newAssignment.due_date_time = new Date(newAssignment.due_date_time).getTime()

        const body = {
            title: newAssignment.title,
            text: newAssignment.text,
            due_date_time: newAssignment.due_date_time,
            points: newAssignment.points
        }

        mutate({ code, assignmentId, body }, {
            onSuccess: (data) => {
                onSubmit()
            },
            onError: (error) => {
                const { status, data } = error.response
                if (status === 400)
                    addErrorToast(data.due_date_time[0])
            }
        })
    }

    useEffect(() => {
        if (isLoading)
            setNewAssignment(initialAssignment)

        else
            setNewAssignment(assignment)

    }, [isLoading])


    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <Stack spacing={2}>
                    <TextField
                        autoFocus
                        variant="outlined"
                        type="text"
                        placeholder='Title'
                        required
                        value={newAssignment?.title}
                        onChange={e => setNewAssignment({
                            ...newAssignment,
                            title: e.target.value,
                        })}
                    />

                    <TextField
                        multiline
                        rows={10}
                        type="text"
                        placeholder="New Assignment"
                        required
                        value={newAssignment?.text}
                        onChange={e => setNewAssignment({
                            ...newAssignment,
                            text: e.target.value,
                        })}
                    />

                    <TextField
                        variant="outlined"
                        type="number"
                        inputProps={{ min: "0" }}
                        placeholder='Points'
                        required
                        value={newAssignment?.points}
                        onChange={e => setNewAssignment({
                            ...newAssignment,
                            points: e.target.value,
                        })}
                    />

                    <BaseDateTimePicker
                        value={newAssignment?.due_date_time}
                        minDateTime={new Date()}
                        onChange={value => setNewAssignment({
                            ...newAssignment,
                            due_date_time: value,
                        })}
                    />

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loadingIndicator="Saving..."
                        loading={isEditing}
                    >
                        Save
                    </LoadingButton >
                </Stack>
            </form>
        </>
    )
}

export default EditAssignment
