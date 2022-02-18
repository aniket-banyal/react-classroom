import { useState } from "react"

function CreateAssignment({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(title, text)
        setText('')
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} >
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
            <input type="submit" value='Create Assignment' />
        </form>
    )

}

export default CreateAssignment
