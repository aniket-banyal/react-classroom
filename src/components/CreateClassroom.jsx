import { useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { createClassroom } from "../api/api"


function CreateClassroom() {
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const navigate = useNavigate()

    const { mutate } = useMutation(createClassroom)

    const handleSubmit = e => {
        e.preventDefault()
        mutate({ name, subject }, {
            onSuccess: ({ data }) => navigate(`${data.code}/dashboard`)
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
