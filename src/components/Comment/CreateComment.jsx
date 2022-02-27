import { useState } from "react"
import useCreateComment from "../../hooks/api/useCreateComment"
import { useParams } from "react-router-dom"


function CreateComment({ announcementId }) {
    const [text, setText] = useState('')
    const { code } = useParams()
    const { mutate } = useCreateComment()


    const handleSubmit = e => {
        e.preventDefault()
        const body = { text }
        mutate({ code, announcementId, body }, {
            onSuccess: () => {
                setText('')
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='New Comment..'
                value={text}
                required
                onChange={e => setText(e.target.value)}
            />
            <input type='submit' value="Post" />
        </form>
    )
}


export default CreateComment
