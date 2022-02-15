import { useState } from "react"

function CreateAnnouncement({ onSubmit }) {
    const [text, setText] = useState('')

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
                placeholder="New Announcement"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <input type="submit" value='Create Announcement' />
        </form>
    )

}

export default CreateAnnouncement
