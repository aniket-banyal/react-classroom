import { useState } from "react"
import BaseDateTimePicker from "../BasicDateTimePicker"

const initialAssignment = {
    title: '',
    text: '',
    points: '',
    dueDateTime: new Date()
}

function CreateAssignment({ onSubmit }) {
    const [assignment, setAssignment] = useState(initialAssignment)

    const handleSubmit = e => {
        e.preventDefault()
        assignment.dueDateTime = new Date(assignment.dueDateTime).getTime()
        onSubmit(assignment)
        setAssignment(initialAssignment)
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
