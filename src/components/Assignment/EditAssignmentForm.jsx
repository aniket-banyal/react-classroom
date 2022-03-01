import { useState } from "react"
import BaseDateTimePicker from "../BasicDateTimePicker"


function EditAssignmentForm({ initialAssignment, handleSubmit }) {
    const [assignment, setAssignment] = useState(initialAssignment)

    return (
        <form onSubmit={e => handleSubmit(e, assignment)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
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
                        required
                        value={assignment.text}
                        onChange={e => setAssignment({
                            ...assignment,
                            text: e.target.value,
                        })}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <input
                        type="number"
                        required
                        min={0}
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
                </div>
            </div>
            <input type="submit" value='Save' />
        </form>
    )
}

export default EditAssignmentForm
