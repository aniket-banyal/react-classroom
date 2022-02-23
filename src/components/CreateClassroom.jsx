import { useState } from "react"
import { useNavigate } from "react-router-dom"


function CreateClassroom() {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const navigate = useNavigate()

    const createNewClassroom = async (name, subject) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'content-Type': 'application/json',
            }),
            body: JSON.stringify({ name, subject })
        }

        const response = await fetch('http://localhost:8000/api/classes_teaching', options)
        const data = await response.json()
        navigate(`${data.code}/dashboard`)
    }

    const handleSubmit = e => {
        e.preventDefault()
        createNewClassroom(name, subject)
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
