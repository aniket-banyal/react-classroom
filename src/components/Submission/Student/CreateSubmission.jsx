import { useState } from "react"

function CreateSubmission({ onSubmit }) {
    const [url, setUrl] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(url)
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
