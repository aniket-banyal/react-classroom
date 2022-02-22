import { useState } from "react"
import BaseDateTimePicker from "../BasicDateTimePicker"

function CreateAssignment({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [dueDateTime, setDueDateTime] = useState(new Date())

    const handleSubmit = e => {
        e.preventDefault()
        const due_date_time = new Date(dueDateTime).getTime()
        onSubmit(title, text, due_date_time)
        setText('')
        setTitle('')
        setDueDateTime(new Date())
    }

    return (
        <form onSubmit={handleSubmit}  >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        rows={10}
                        cols={50}
                        placeholder="New Assignment"
                        value={text}
                        required
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div>
                    <BaseDateTimePicker
                        value={dueDateTime}
                        onChange={setDueDateTime}
                    />
                </div>
            </div>
            <input type="submit" value='Create Assignment' />
        </form>
    )

}

export default CreateAssignment
