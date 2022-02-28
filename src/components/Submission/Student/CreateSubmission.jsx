import { useState } from "react"
import { useParams } from "react-router-dom"
import useCreateSubmission from "../../../hooks/api/useCreateSubmission"

function CreateSubmission() {
    const [url, setUrl] = useState('')
    const { code, assignment_id } = useParams()
    const { mutate } = useCreateSubmission()

    const handleSubmit = e => {
        e.preventDefault()

        const body = { url }
        mutate({ code, assignmentId: assignment_id, body })
        setUrl('')
    }

    return (
        <form onSubmit={handleSubmit} >
            <input
                type='url'
                placeholder="File url..."
                value={url}
                required
                onChange={e => setUrl(e.target.value)}
            />
            <input type="submit" value='Submit' />
        </form>
    )

}

export default CreateSubmission
