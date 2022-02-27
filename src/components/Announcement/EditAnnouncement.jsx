import { useState } from "react"
import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import useEditAnnouncement from "../../hooks/api/useEditAnnouncement"

function EditAnnouncement({ announcement, onSubmit }) {
    const [text, setText] = useState(announcement.text)
    const { code } = useParams()
    const { mutate } = useEditAnnouncement()
    const queryClient = useQueryClient()

    const handleSubmit = e => {
        e.preventDefault()
        mutate({ code, announcement_id: announcement.id, body: { text } }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['announcements', code])
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
