import { useState } from "react"
import { useParams } from "react-router-dom"
import BaseDateTimePicker from "../shared/BasicDateTimePicker"
import useCreateAssignment from "../../hooks/api/useCreateAssignment"
import { addErrorToast } from "../../helpers/addToast"
import { Stack, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import BasicModal from "../shared/BasicModal"
import AddIcon from '@mui/icons-material/Add';
import StyledFab from "../shared/StyledFab"


function CreateAssignment() {
    const initialAssignment = {
        title: '',
        text: '',
        points: '',
        due_date_time: new Date(Date.now() + (2 * 60 * 1000))
    }

    const [assignment, setAssignment] = useState(initialAssignment)
    const [creating, setCreating] = useState(false)
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
                setCreating(false)
                setAssignment(initialAssignment)
            },
            onError: (error) => {
                const { status, data } = error.response
                if (status === 400) {
                    if (data.hasOwnProperty('due_date_time'))
                        addErrorToast(data.due_date_time[0])

                    if (data.hasOwnProperty('points')) {
                        addErrorToast(data.points[0])
                    }
                }
            }
        })
    }

    return (
        <>
            <StyledFab
                color="primary"
                variant='extended'
                onClick={() => setCreating(true)}
                focusRipple={false}
            >
                <AddIcon />
                New Assignment
            </StyledFab>

            <BasicModal
                open={creating}
                setOpen={setCreating}
                title='Create Assignment'
            >
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
                            minDateTime={new Date()}
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
                            disabled={
                                assignment.title === '' ||
                                assignment.text === '' ||
                                assignment.points === '' ||
                                assignment.due_date_time === ''
                            }
                        >
                            Post
                        </LoadingButton >
                    </Stack>
                </form>
            </BasicModal>
        </>
    )
}

export default CreateAssignment
