import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useCreateClassroom from "../hooks/api/useCreateClassroom"


function CreateClassroom({ onSubmit }) {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const navigate = useNavigate()

    const { mutate } = useCreateClassroom()

    const handleSubmit = e => {
        e.preventDefault()
        mutate({ name, subject }, {
            onSuccess: (data) => {
                onSubmit()
                navigate(`${data.code}/dashboard`)
            }
        })

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
