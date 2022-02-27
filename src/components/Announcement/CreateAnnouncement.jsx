import { useState } from "react"
import useCreateAnnouncement from "../../hooks/api/useCreateAnnouncement"
import { useParams } from "react-router-dom"
import { useQueryClient } from "react-query"

function CreateAnnouncement() {
    const [text, setText] = useState('')
    const { code } = useParams()
    const { mutate } = useCreateAnnouncement()
    const queryClient = useQueryClient()

    const handleSubmit = e => {
        e.preventDefault()
        const body = { text }
        mutate({ code, body }, {
            onSuccess: () => {
                queryClient.invalidateQueries(['announcements', code])
                setText('')
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} >
            <textarea
                rows={10}
                cols={50}
                placeholder="New Announcement"
                value={text}
                required
                onChange={e => setText(e.target.value)}
            />
            <input type="submit" value='Create Announcement' />
        </form>
    )

}

export default CreateAnnouncement
