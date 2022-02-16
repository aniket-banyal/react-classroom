import { useState } from "react"

function CreateComment({ onSubmit }) {
    const [text, setText] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='New Comment..' value={text} onChange={e => setText(e.target.value)} />
            <input type='submit' value="Post" />
        </form>
    )
}


export default CreateComment
