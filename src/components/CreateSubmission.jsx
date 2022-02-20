import { useState } from "react"

function CreateSubmission({ onSubmit }) {
    const [text, setText] = useState()

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit} >
            <textarea
                rows={10}
                cols={50}
                placeholder="Submission..."
                value={text}
                required
                onChange={e => setText(e.target.value)}
            />
            <input type="submit" value='Submit' />
        </form>
    )

}

export default CreateSubmission
