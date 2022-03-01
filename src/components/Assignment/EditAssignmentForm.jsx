import { useState } from "react"
import BaseDateTimePicker from "../BasicDateTimePicker"


function EditAssignmentForm({ initialAssignment, handleSubmit }) {
    const [assignment, setAssignment] = useState(initialAssignment)

    return (
        <form onSubmit={e => handleSubmit(e, assignment)}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
                        value={assignment.due_date_time}
                        onChange={value => setAssignment({
                            ...assignment,
                            due_date_time: value,
                        })}
                    />
                </div>
            </div>
            <input type="submit" value='Save' />
        </form>
    )
}

export default EditAssignmentForm
