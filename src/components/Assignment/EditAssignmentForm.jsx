import { useState } from "react"
import BaseDateTimePicker from "../BasicDateTimePicker"
import { Stack, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"


function EditAssignmentForm({ initialAssignment, handleSubmit, isEditing }) {
    const [assignment, setAssignment] = useState(initialAssignment)

    return (
        <form onSubmit={e => handleSubmit(e, assignment)}>
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
                    minDateTime={new Date()}
                    onChange={value => setAssignment({
                        ...assignment,
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
    )
}

export default EditAssignmentForm
