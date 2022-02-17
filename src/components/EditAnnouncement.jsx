import { useState } from "react"

function EditAnnouncement({ onSubmit, initialText }) {
    const [text, setText] = useState(initialText)

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
                value={text}
                required
                onChange={e => setText(e.target.value)}
            />
            <input type="submit" value='Save' />
        </form>
    )

}

export default EditAnnouncement
