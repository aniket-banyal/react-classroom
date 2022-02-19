import { useState } from "react"

function CreateAssignment({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [dueDateTime, setDueDateTime] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const due_date_time = new Date(dueDateTime).getTime()
        onSubmit(title, text, due_date_time)
        setText('')
        setTitle('')
        setDueDateTime('')
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
                    <input
                        type='datetime-local'
                        value={dueDateTime}
                        required
                        onChange={e => setDueDateTime(e.target.value)}
                    />
                </div>
            </div>
            <input type="submit" value='Create Assignment' />
        </form>
    )

}

export default CreateAssignment
