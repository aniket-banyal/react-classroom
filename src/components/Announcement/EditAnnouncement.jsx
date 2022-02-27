import { useState } from "react"
import { useParams } from "react-router-dom"
import useEditAnnouncement from "../../hooks/api/useEditAnnouncement"

function EditAnnouncement({ announcement, onSubmit }) {
    const [text, setText] = useState(announcement.text)
    const { code } = useParams()
    const { mutate } = useEditAnnouncement()

    const handleSubmit = e => {
        e.preventDefault()
        const body = { text }
        mutate({ code, announcement_id: announcement.id, body }, {
            onSuccess: () => {
                setText('')
                onSubmit()
            }
        })
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
