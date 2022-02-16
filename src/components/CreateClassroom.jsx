import { useState } from "react"


function CreateClassroom({ onSubmit }) {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(name, subject)
        setName('')
        setSubject('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Name'
                value={name}
                required
                onChange={e => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder='Subject'
                value={subject}
                required
                onChange={e => setSubject(e.target.value)}
            />
            <input type='submit' value="Create new classroom" />
        </form>
    )
}

export default CreateClassroom
