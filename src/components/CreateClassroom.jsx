import { useState } from "react"


function CreateClassroom({ onCreate }) {
    console.log('CreateClassroom')
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onCreate(name, subject)
        setName('')
        setSubject('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder='Subject' value={subject} onChange={e => setSubject(e.target.value)} />
            <input type='submit' value="Create new classroom" />
        </form>
    )
}

export default CreateClassroom
