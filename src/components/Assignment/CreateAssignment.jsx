import { useState } from "react"
import { useParams } from "react-router-dom"
import BaseDateTimePicker from "../BasicDateTimePicker"
import useCreateAssignment from "../../hooks/api/useCreateAssignment"
import { addErrorToast } from "../../helpers/addToast"

const initialAssignment = {
    title: '',
    text: '',
    points: '',
    dueDateTime: new Date()
}

function CreateAssignment() {
    const [assignment, setAssignment] = useState(initialAssignment)
    const { code } = useParams()
    const { mutate } = useCreateAssignment()

    const handleSubmit = e => {
        e.preventDefault()
        assignment.dueDateTime = new Date(assignment.dueDateTime).getTime()

        const body = {
            title: assignment.title,
            text: assignment.text,
            due_date_time: assignment.dueDateTime,
            points: assignment.points
        }

        mutate({ code, body }, {
            onSuccess: () => {
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
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        value={assignment.title}
                        onChange={e => setAssignment({
                            ...assignment,
                            title: e.target.value,
                        })}
                    />
                    <textarea
                        rows={10}
                        cols={50}
                        placeholder="New Assignment"
                        required
                        value={assignment.text}
                        onChange={e => setAssignment({
                            ...assignment,
                            text: e.target.value,
                        })}
                    />
                    <input
                        type="number"
                        placeholder='Points'
                        required
                        min={0}
                        value={assignment.points}
                        onChange={e => setAssignment({
                            ...assignment,
                            points: e.target.value,
                        })}
                    />
                </div>
                <div>
                    <BaseDateTimePicker
                        value={assignment.dueDateTime}
                        onChange={value => setAssignment({
                            ...assignment,
                            dueDateTime: value,
                        })}
                    />
                </div>
            </div>
            <input type="submit" value='Create Assignment' />
        </form>
    )

}

export default CreateAssignment
